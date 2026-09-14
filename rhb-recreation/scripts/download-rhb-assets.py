"""Download all www.rhbgroup.com image/icon URLs referenced in src/."""
from __future__ import annotations

import re
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src'
OUT = ROOT / 'public' / 'assets' / 'rhb-cdn'


def expand_media_file(rel: str) -> list[str]:
    text = (SRC / rel).read_text(encoding='utf-8')
    media = re.search(r"const media = '([^']+)'", text)
    if not media:
        return []
    base = media.group(1)
    return [f'{base}/{m.group(1)}' for m in re.finditer(r'\$\{media\}/([^\'"`]+)', text)]


def has_asset_extension(url: str) -> bool:
    name = urllib.parse.unquote(urllib.parse.urlparse(url).path.split('/')[-1])
    return '.' in name and not name.endswith('.')


def collect_urls() -> set[str]:
    urls: set[str] = set()
    for path in SRC.rglob('*'):
        if path.suffix not in {'.ts', '.tsx', '.css'}:
            continue
        text = path.read_text(encoding='utf-8', errors='ignore')
        for match in re.finditer(r'https://www\.rhbgroup\.com[^\s"\'`)]+', text):
            url = match.group(0).rstrip('.,')
            if has_asset_extension(url):
                urls.add(url)
    for rel in ['data/personal.ts', 'data/business.ts', 'data/premier.ts']:
        urls.update(expand_media_file(rel))
    return urls


def url_to_local_path(url: str) -> Path:
    parsed = urllib.parse.urlparse(url)
    # e.g. /-/media/Microsites/overview_premier/images/bg-wealth-management.jpg
    path = urllib.parse.unquote(parsed.path)
    prefix = '/-/media/'
    if path.startswith(prefix):
        path = path[len(prefix) :]
    else:
        path = path.lstrip('/')
    return OUT / path.replace('/', '\\') if False else OUT / Path(*path.split('/'))


def download(url: str) -> tuple[str, str]:
    dest = url_to_local_path(url)
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return 'skipped', str(dest.relative_to(ROOT))
    req = urllib.request.Request(
        url,
        headers={'User-Agent': 'Mozilla/5.0 (compatible; RHBAssetMirror/1.0)'},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
        dest.write_bytes(data)
        return 'ok', str(dest.relative_to(ROOT))
    except urllib.error.HTTPError as exc:
        return f'http-{exc.code}', url
    except Exception as exc:  # noqa: BLE001
        return f'error-{type(exc).__name__}', url


def main() -> None:
    urls = sorted(collect_urls())
    print(f'Found {len(urls)} unique RHB CDN URLs')
    print(f'Saving to: {OUT.relative_to(ROOT)}')
    ok = skipped = failed = 0
    failures: list[tuple[str, str]] = []
    for index, url in enumerate(urls, 1):
        status, detail = download(url)
        if status == 'ok':
            ok += 1
            print(f'[{index}/{len(urls)}] saved {detail}')
        elif status == 'skipped':
            skipped += 1
        else:
            failed += 1
            failures.append((status, detail))
            print(f'[{index}/{len(urls)}] FAILED ({status}) {url}')
    print('---')
    print(f'Downloaded: {ok}')
    print(f'Skipped (already exists): {skipped}')
    print(f'Failed: {failed}')
    if failures:
        log = OUT.parent / 'rhb-cdn-download-failures.txt'
        log.write_text('\n'.join(f'{s}\t{u}' for s, u in failures), encoding='utf-8')
        print(f'Failure log: {log.relative_to(ROOT)}')


if __name__ == '__main__':
    main()

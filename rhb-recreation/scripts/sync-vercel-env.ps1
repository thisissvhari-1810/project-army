# Sync credentials from .env.local to Vercel production.
# Run from project root: .\scripts\sync-vercel-env.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

$envFile = Join-Path $root '.env.local'
if (-not (Test-Path $envFile)) {
  Write-Error ".env.local not found. Create it from .env.example first."
}

$keys = @(
  'SITE_ACCESS_PIN',
  'BALANCE_VIEW_PIN',
  'SEED_ADMIN_USERNAME',
  'SEED_ADMIN_PASSWORD',
  'SEED_USER_USERNAME',
  'SEED_USER_PASSWORD',
  'SESSION_SECRET',
  'MIGRATION_SECRET',
  'ALLOWED_ORIGINS',
  'DATABASE_URL'
)

$lines = Get-Content $envFile | Where-Object { $_ -match '^\s*[A-Z_]+\s*=' -and $_ -notmatch '^\s*#' }

foreach ($key in $keys) {
  $match = $lines | Where-Object { $_ -match "^$key=" } | Select-Object -First 1
  if (-not $match) {
    Write-Warning "Skipping $key (not in .env.local)"
    continue
  }
  $value = ($match -split '=', 2)[1].Trim()
  if ($value -match '^(postgresql://user:password|replace-with)') {
    Write-Warning "Skipping $key (placeholder value)"
    continue
  }
  Write-Host "Adding $key to Vercel production..."
  $value | npx vercel env add $key production --force
}

Write-Host "Done. Redeploy with: npx vercel deploy --prod"

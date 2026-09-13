function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export async function startLoginCamera(video: HTMLVideoElement): Promise<MediaStream | null> {
  if (!navigator.mediaDevices?.getUserMedia) return null

  const mobile = isMobileDevice()

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: mobile ? 720 : 640 },
        height: { ideal: mobile ? 960 : 480 },
      },
      audio: false,
    })
    video.srcObject = stream
    await video.play()
    return stream
  } catch {
    return null
  }
}

export function stopLoginCamera(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop())
}

export function captureLoginPhoto(video: HTMLVideoElement): string | undefined {
  const width = video.videoWidth
  const height = video.videoHeight
  if (!width || !height) return undefined

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) return undefined

  ctx.translate(width, 0)
  ctx.scale(-1, 1)
  ctx.drawImage(video, 0, 0, width, height)
  return canvas.toDataURL('image/jpeg', mobileCaptureQuality())
}

function mobileCaptureQuality() {
  return isMobileDevice() ? 0.68 : 0.72
}

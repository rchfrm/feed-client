export const validateFile = (blob) => {
  const maxSize = 5 // MB
  const allowedFileExtensions = ['png', 'jpeg', 'jpg', 'gif']
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
  const { name, type, size } = blob
  const fileExtension = name.split('.').pop()

  if (!allowedFileExtensions.includes(fileExtension) || !allowedMimeTypes.includes(type)) {
    return { message: 'File format must be either PNG or JPG/JPEG' }
  }

  if (size / (1024 * 1024) > maxSize) {
    return { message: 'The image size is too big! ( Max. 5MB )' }
  }
}

const getObjectFitSize = (containerWidth, containerHeight, width, height) => {
  const ratio = width / height
  const containerRatio = containerWidth / containerHeight
  let targetWidth = 0
  let targetHeight = 0

  if (ratio > containerRatio) {
    targetWidth = containerWidth
    targetHeight = targetWidth / ratio
  } else {
    targetHeight = containerHeight
    targetWidth = targetHeight * ratio
  }

  return {
    width: targetWidth,
    height: targetHeight,
    x: (containerWidth - targetWidth) / 2,
    y: (containerHeight - targetHeight) / 2,
  }
}

const canvasToBlob = (canvas) => {
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file)
    }, 'image/jpeg')
  })
}

export const getCroppedImageBlob = (image, crop) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return null
  }

  const objectFitSize = getObjectFitSize(image.width, image.height, image.naturalWidth, image.naturalHeight)

  const scaleX = image.naturalWidth / objectFitSize.width
  const scaleY = image.naturalHeight / objectFitSize.height

  canvas.width = Math.floor(crop.width * scaleX)
  canvas.height = Math.floor(crop.height * scaleY)

  context.imageSmoothingQuality = 'high'

  const cropX = (crop.x - objectFitSize.x) * scaleX
  const cropY = (crop.y - objectFitSize.y) * scaleY

  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  context.save()
  context.translate(-cropX, -cropY)
  context.translate(centerX, centerY)
  context.translate(-centerX, -centerY)

  context.drawImage(image, 0, 0)
  context.restore()

  return canvasToBlob(canvas)
}

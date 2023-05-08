export const validateFile = (blob, type) => {
  const maxSizePerType = {
    image: 5,
    video: 10,
  }

  const allowedFileExtensions = {
    image: ['png', 'jpeg', 'jpg', 'gif'],
    video: ['mp4'],
  }

  const allowedMimeTypes = {
    image: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
    video: ['video/mp4'],
  }

  const maxSize = maxSizePerType[type]
  const { name, size } = blob
  const fileExtension = name.split('.').pop()

  if (! allowedFileExtensions[type].includes(fileExtension) || ! allowedMimeTypes[type].includes(blob.type)) {
    const formatter = new Intl.ListFormat('en', { style: 'short', type: 'disjunction' })
    return { message: `File format must be either ${formatter.format(allowedFileExtensions[type])}` }
  }

  if (size / (1024 * 1024) > maxSize) {
    return { message: `The ${type} size is too big! ( Max. ${maxSize}MB )` }
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

export const getCroppedImageBlob = async (image, crop) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (! context) {
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

  const blob = await canvasToBlob(canvas)

  return {
    canvas,
    blob,
  }
}

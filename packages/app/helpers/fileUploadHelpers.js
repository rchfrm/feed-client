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
  
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
  
    canvas.width = Math.floor(crop.width * scaleX)
    canvas.height = Math.floor(crop.height * scaleY)
  
    context.imageSmoothingQuality = 'high'
  
    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY
  
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

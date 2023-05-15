import React from 'react'
import PropTypes from 'prop-types'
import ReactCrop from 'react-image-crop'
import TrashIcon from '@/icons/TrashIcon'
import { getCroppedImageBlob, createVideoThumbnail } from '@/app/helpers/fileUploadHelpers'
import brandColors from '@/constants/brandColors'
import 'react-image-crop/dist/ReactCrop.css'

const FileUploadViewer = React.forwardRef(({
  type,
  files,
  fileUrl,
  setFileUrl,
  setFiles,
  setError,
}, ref) => {
  const [crop, setCrop] = React.useState(null)

  const imageRef = React.useRef(null)
  const hasCreatedThumbnail = React.useRef(false)

  const onSeeked = async ({ target }) => {
    if (hasCreatedThumbnail.current) {
      return
    }

    hasCreatedThumbnail.current = true

    setFiles([
      files[0],
      {
        file: await createVideoThumbnail(target),
        metaData: {
          type: 'image',
          width: target.videoWidth,
          height: target.videoHeight,
        },
      },
    ])
  }

  const onLoad = (e) => {
    const isVideo = type === 'video'

    if (isVideo && hasCreatedThumbnail.current) {
      return
    }

    const prefix = isVideo ? 'video' : 'natural'
    setFiles([{
      ...files[0],
      metaData: {
        ...files[0].metaData,
        width: e.target[`${prefix}Width`],
        height: e.target[`${prefix}Height`],
        ...(isVideo && { duration: e.target.duration }),
      },
    }])

    if (isVideo) {
      e.target.currentTime = 0.001
    }
  }

  const onComplete = async (crop) => {
    const { canvas, blob } = await getCroppedImageBlob(imageRef.current, crop)

    setFiles([{
      file: blob,
      metaData: {
        type,
        width: canvas.width,
        height: canvas.height,
      },
    }])
  }

  const reset = () => {
    setFileUrl('')
    setFiles([])
    setError(null)
    ref.current.value = null
    hasCreatedThumbnail.current = false
  }

  return (
    <>
      {type === 'image' ? (
        <ReactCrop
          crop={crop}
          onChange={setCrop}
          onComplete={onComplete}
          className="h-full"
        >
          <img src={fileUrl} ref={imageRef} onLoad={onLoad} alt="file upload" className="h-full object-contain" />
        </ReactCrop>
      ) : (
        <video
          onCanPlay={onLoad}
          onSeeked={onSeeked}
          className="h-full w-auto"
          controls
        >
          <source src={fileUrl} />
          Your browser does not support the video tag.
        </video>
      )}
      <button onClick={reset} className="absolute top-3 right-3">
        <TrashIcon className="w-4 h-auto" fill={brandColors.red} />
      </button>
    </>
  )
})

FileUploadViewer.displayName = 'FileUploadViewer'

FileUploadViewer.propTypes = {
  type: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
  fileUrl: PropTypes.string.isRequired,
  setFileUrl: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default FileUploadViewer

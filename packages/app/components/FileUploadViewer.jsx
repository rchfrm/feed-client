import React from 'react'
import PropTypes from 'prop-types'
import ReactCrop from 'react-image-crop'
import TrashIcon from '@/icons/TrashIcon'
import { getCroppedImageBlob } from '@/app/helpers/fileUploadHelpers'
import brandColors from '@/constants/brandColors'
import 'react-image-crop/dist/ReactCrop.css'

const FileUploadViewer = React.forwardRef(({
  type,
  fileUrl,
  setFileUrl,
  setFile,
  setFileName,
  setMetaData,
  setError,
}, ref) => {
  const [crop, setCrop] = React.useState(null)
  const imageRef = React.useRef(null)

  const onLoad = (e) => {
    const isVideo = type === 'video'
    const prefix = isVideo ? 'video' : 'natural'

    setMetaData({
      type,
      width: e.target[`${prefix}Width`],
      height: e.target[`${prefix}Height`],
      ...(isVideo && { duration: e.target.duration }),
    })
  }

  const onComplete = async (crop) => {
    const { canvas, blob } = await getCroppedImageBlob(imageRef.current, crop)

    setFile(blob)
    setMetaData({
      type,
      width: canvas.width,
      height: canvas.height,
    })
  }

  const reset = () => {
    setFileUrl('')
    setFile(null)
    setFileName('')
    setMetaData(null)
    setError(null)
    ref.current.value = null
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
          width="260"
          height="150"
          controls
          className="h-full"
          onLoadedData={onLoad}
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
  fileUrl: PropTypes.string.isRequired,
  setFileUrl: PropTypes.func.isRequired,
  setFile: PropTypes.func.isRequired,
  setFileName: PropTypes.func.isRequired,
  setMetaData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default FileUploadViewer

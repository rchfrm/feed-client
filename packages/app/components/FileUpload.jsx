import React from 'react'
import PropTypes from 'prop-types'
import ReactCrop from 'react-image-crop'
import Error from '@/elements/Error'
import TrashIcon from '@/icons/TrashIcon'
import { validateFile, getCroppedImageBlob } from '@/app/helpers/fileUploadHelpers'
import brandColors from '@/constants/brandColors'
import 'react-image-crop/dist/ReactCrop.css'

const FileUpload = ({ setFile }) => {
  const [fileUrl, setFileUrl] = React.useState('')
  const [isDragging, setIsDragging] = React.useState(false)
  const [crop, setCrop] = React.useState({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  })
  const [error, setError] = React.useState(null)

  const fileInputRef = React.useRef(null)
  const imageRef = React.useRef(null)

  const upload = (blob) => {
    setIsDragging(false)
    setError(null)

    if (!blob) {
      return
    }

    const error = validateFile(blob)
    if (error) {
      setError(error)
      return
    }

    const blobUrl = URL.createObjectURL(blob)
    setFileUrl(blobUrl)
    setFile(blob)
  }

  const onChange = (e) => {
    const { target: { files } } = e

    upload(files[0])
  }

  const onDrop = (e) => {
    e.preventDefault()

    const { dataTransfer: { files } } = e

    upload(files[0])
  }

  const onDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onComplete = async (crop) => {
    const blob = await getCroppedImageBlob(imageRef.current, crop)
    setFile(blob)
  }

  const reset = () => {
    setFileUrl('')
    setFile(null)
    setError(null)
    fileInputRef.current.value = null
  }

  return (
    <div className="mb-10">
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={[
          'relative h-96 mb-4',
          'flex items-center justify-center',
          'border border-dashed border-black rounded-dialogue',
          !fileUrl ? 'p-5' : null,
          isDragging ? 'bg-grey-1' : null,
        ].join(' ')}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current.click()}
          className={[
            'h-full absolute inset-0',
            fileUrl ? 'pointer-events-none' : null,
          ].join(' ')}
          aria-label="file upload"
        />
        {fileUrl ? (
          <>
            <ReactCrop
              crop={crop}
              onChange={setCrop}
              onComplete={onComplete}
              className="h-full"
            >
              <img src={fileUrl} ref={imageRef} alt="file upload" className="h-full object-contain" />
            </ReactCrop>
            <button onClick={reset} className="absolute top-3 right-3">
              <TrashIcon className="w-4 h-auto" fill={brandColors.red} />
            </button>
          </>
        ) : (
          <p className="mb-0 text-center">Drag and drop file or click to upload</p>
        )}
      </div>
      <input
        type="file"
        name="file"
        onChange={onChange}
        ref={fileInputRef}
        className="hidden"
      />
      <Error error={error} />
    </div>
  )
}

FileUpload.propTypes = {
  setFile: PropTypes.func.isRequired,
}

FileUpload.defaultProps = {
}

export default FileUpload

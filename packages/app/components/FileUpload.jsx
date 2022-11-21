import React from 'react'
import PropTypes from 'prop-types'
import Error from '@/elements/Error'
import { validateFile } from '@/helpers/utils'

const FileUpload = ({ setFile }) => {
  const [fileUrl, setFileUrl] = React.useState('')
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState(null)

  const fileInputRef = React.useRef(null)

  const upload = (blob) => {
    setIsDragging(false)

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
    setError(null)

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
          'relative',
          'w-60 h-60 mb-2',
          'border border-dashed border-black rounded-dialogue',
          'flex items-center justify-center',
          isDragging ? 'bg-grey-1' : null,
        ].join(' ')}
      >
        <div
          className="absolute top-0 left-0 right-0 bottom-0"
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current.click()}
          aria-label="file upload"
        />
        {fileUrl ? (
          <img src={fileUrl} alt="" />
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
      {fileUrl && (
        <div className="flex flex-column items-start mb-2 text-sm">
          <button type="button" onClick={() => fileInputRef.current.click()}>Change image</button>
          <button type="button" onClick={reset}>Delete image</button>
        </div>
      )}
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

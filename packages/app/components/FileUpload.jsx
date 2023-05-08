import React from 'react'
import PropTypes from 'prop-types'
import FileUploadViewer from '@/app/FileUploadViewer'
import Error from '@/elements/Error'
import { validateFile } from '@/app/helpers/fileUploadHelpers'

const FileUpload = ({ setFile, setFileName, setMetaData }) => {
  const [fileUrl, setFileUrl] = React.useState('')
  const [type, setType] = React.useState('')
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState(null)

  const fileInputRef = React.useRef(null)

  const upload = (blob) => {
    setIsDragging(false)
    setError(null)

    if (! blob) {
      return
    }

    const type = blob.type.split('/')[0]
    setType(type)

    const error = validateFile(blob, type)
    if (error) {
      setError(error)
      return
    }

    const blobUrl = URL.createObjectURL(blob)
    setFile(blob)
    setFileUrl(blobUrl)
    setFileName(fileInputRef.current.value.split('\\').pop())
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

    setIsDragging((isDragging) => ! isDragging)
  }

  const onDragLeave = (e) => {
    e.preventDefault()

    setIsDragging((isDragging) => ! isDragging)
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="mb-10">
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={[
          'relative h-60 mb-4',
          'flex items-center justify-center',
          'border-2 border-dashed border-black rounded-dialogue',
          ! fileUrl ? 'p-5' : null,
          isDragging ? 'bg-grey-light' : null,
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
          <FileUploadViewer
            type={type}
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            setFile={setFile}
            setFileName={setFileName}
            setMetaData={setMetaData}
            setError={setError}
            ref={fileInputRef}
          />
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
  setFileName: PropTypes.func.isRequired,
  setMetaData: PropTypes.func.isRequired,
}

export default FileUpload

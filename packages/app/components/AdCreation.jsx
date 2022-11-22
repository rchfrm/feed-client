import React from 'react'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import FileUpload from '@/app/FileUpload'
import TextArea from '@/elements/TextArea'
import CheckboxInput from '@/elements/CheckboxInput'
import Button from '@/elements/Button'

const AdCreation = () => {
  const [file, setFile] = React.useState(null)
  const [caption, setCaption] = React.useState('')

  const { setSidePanelButton } = React.useContext(SidePanelContext)

  const handleChange = ({ target }) => {
    const { name, value } = target

    if (name === 'caption') {
      setCaption(value)
    }

    if (name === 'link') {
      console.log('Handle link')
    }

    if (name === 'cta') {
      console.log('Handle CTA')
    }
  }

  const save = React.useCallback(() => {
    const data = {
      file,
      caption,
    }

    console.log(data)
  }, [file, caption])

  React.useEffect(() => {
    const button = (
      <Button
        version="green"
        onClick={save}
        trackComponentName="AdCreation"
      >
        Save
      </Button>
    )

    setSidePanelButton(button)
  }, [setSidePanelButton, save])

  return (
    <div>
      <h2 className="mb-8">Create ad</h2>
      <p className="font-bold">1. Upload image</p>
      <FileUpload setFile={setFile} />
      <p className="font-bold">2. Enter a caption</p>
      <TextArea
        name="caption"
        value={caption}
        handleChange={handleChange}
        placeholder="Type a caption for your ad..."
      />
      <p className="font-bold">3. Link and CTA</p>
      <CheckboxInput
        buttonLabel="Use default link"
        value="link"
        checked
        onChange={handleChange}
        disabled={false}
        className=""
      />
      <CheckboxInput
        buttonLabel="Use default CTA"
        value="cta"
        checked
        onChange={handleChange}
        disabled={false}
        className=""
      />
    </div>
  )
}

AdCreation.propTypes = {
}

AdCreation.defaultProps = {
}

export default AdCreation

import React from 'react'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import useControlsStore from '@/app/stores/controlsStore'
import FileUpload from '@/app/FileUpload'
import TextArea from '@/elements/TextArea'
import PostLinkCheckBoxSelect from '@/app/PostLinkCheckBoxSelect'
import Button from '@/elements/Button'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  optimizationPreferences: state.optimizationPreferences,
})

const AdCreation = () => {
  const { defaultLink } = useControlsStore(getControlsStoreState)

  const [file, setFile] = React.useState(null)
  const [caption, setCaption] = React.useState('')
  const [isDefaultLink, setIsDefaultLink] = React.useState(true)
  const [currentLink, setCurrentLink] = React.useState({
    id: defaultLink.id,
    href: defaultLink.href,
  })

  const { setSidePanelButton } = React.useContext(SidePanelContext)

  const handleChange = ({ target }) => {
    const { value } = target
    setCaption(value)
  }

  const save = React.useCallback(() => {
    const data = {
      file,
      caption,
      link: isDefaultLink ? defaultLink?.id : currentLink.id,
    }

    console.log(data)
  }, [file, caption, isDefaultLink, defaultLink.id, currentLink.id])

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
      <PostLinkCheckBoxSelect
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
        isDefaultLink={isDefaultLink}
        setIsDefaultLink={setIsDefaultLink}
      />
    </div>
  )
}

AdCreation.propTypes = {
}

AdCreation.defaultProps = {
}

export default AdCreation

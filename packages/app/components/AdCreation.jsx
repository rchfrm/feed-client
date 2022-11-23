import React from 'react'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import useControlsStore from '@/app/stores/controlsStore'
import FileUpload from '@/app/FileUpload'
import TextArea from '@/elements/TextArea'
import PostLinkCheckBoxSelect from '@/app/PostLinkCheckBoxSelect'
import PostCallToActionCheckboxSelect from '@/app/PostCallToActionCheckboxSelect'
import Button from '@/elements/Button'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  postsPreferences: state.postsPreferences,
})

const AdCreation = () => {
  const { defaultLink, postsPreferences } = useControlsStore(getControlsStoreState)
  const { callToAction: defaultCallToAction } = postsPreferences

  const [file, setFile] = React.useState(null)
  const [caption, setCaption] = React.useState('')
  const [isDefaultLink, setIsDefaultLink] = React.useState(true)
  const [currentLink, setCurrentLink] = React.useState({
    id: defaultLink.id,
    href: defaultLink.href,
  })
  const [callToActions, setCallToActions] = React.useState([])
  const [currentCallToAction, setCurrentCallToAction] = React.useState('')
  const [currentCallToActionId, setCurrentCallToActionId] = React.useState('')
  const [isDefaultCallToAction, setIsDefaultCallToAction] = React.useState(true)

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
      callToAction: isDefaultCallToAction ? defaultCallToAction : currentCallToAction,
    }

    console.log(data)
  }, [file, caption, isDefaultLink, defaultLink?.id, currentLink?.id, currentCallToAction, defaultCallToAction, isDefaultCallToAction])

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
    <div className="pr-10">
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
      <PostCallToActionCheckboxSelect
        currentCallToAction={currentCallToAction}
        setCurrentCallToAction={setCurrentCallToAction}
        currentCallToActionId={currentCallToActionId}
        setCurrentCallToActionId={setCurrentCallToActionId}
        isDefaultCallToAction={isDefaultCallToAction}
        setIsDefaultCallToAction={setIsDefaultCallToAction}
        callToActions={callToActions}
        setCallToActions={setCallToActions}
      />
    </div>
  )
}

AdCreation.propTypes = {
}

AdCreation.defaultProps = {
}

export default AdCreation

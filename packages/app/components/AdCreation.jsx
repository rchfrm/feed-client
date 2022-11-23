import React from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import useControlsStore from '@/app/stores/controlsStore'
import FileUpload from '@/app/FileUpload'
import PostLinkCheckBoxSelect from '@/app/PostLinkCheckBoxSelect'
import PostCallToActionCheckboxSelect from '@/app/PostCallToActionCheckboxSelect'
import TextArea from '@/elements/TextArea'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import { createAd } from '@/app/helpers/postsHelpers'

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
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)
  const { setSidePanelButton } = React.useContext(SidePanelContext)

  const handleChange = ({ target }) => {
    const { value } = target
    setCaption(value)
  }

  const save = React.useCallback(async () => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('caption', caption)
    formData.append('link', isDefaultLink ? defaultLink?.id : currentLink.id)
    formData.append('callToAction', isDefaultCallToAction ? defaultCallToAction : currentCallToAction)

    const { error } = await createAd(artistId, formData)
    if (error) {
      setError(error)
      setIsLoading(false)
    }

    setIsLoading(false)
  }, [file, caption, isDefaultLink, defaultLink?.id, currentLink?.id, currentCallToAction, defaultCallToAction, isDefaultCallToAction, artistId])

  React.useEffect(() => {
    const button = (
      <Button
        version="green"
        onClick={save}
        trackComponentName="AdCreation"
        disabled={!file || !caption}
        loading={isLoading}
      >
        Save
      </Button>
    )

    setSidePanelButton(button)
  }, [setSidePanelButton, save, caption, file, isLoading])

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
      <Error error={error} />
    </div>
  )
}

export default AdCreation

import React from 'react'
import PropTypes from 'prop-types'
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
import { fileMimeType } from '@/app/helpers/fileUploadHelpers'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
})

const AdCreation = ({ setPosts }) => {
  const { defaultLink } = useControlsStore(getControlsStoreState)
  const campaignType = 'all'

  const [files, setFiles] = React.useState([])
  const [fileName, setFileName] = React.useState('')
  const [message, setMessage] = React.useState('')
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
  const { setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)

  const handleChange = ({ target }) => {
    const { value } = target
    setMessage(value)
  }

  const save = React.useCallback(async () => {
    setIsLoading(true)

    const formData = new FormData()
    const data = {
      message,
      ...(! isDefaultLink && {
        link: {
          type: 'linkbank',
          linkId: currentLink.linkId,
          campaignType,
        },
      }),
      ...(! isDefaultCallToAction && {
        callToAction: {
          callToAction: currentCallToAction,
          campaignType,
        },
      }),
    }

    files.forEach(({ file }) => {
      formData.append('files', file, `${fileName}.${fileMimeType[file.type]}`)
    })
    formData.append('metaData', JSON.stringify(files.map((file) => file.metaData)))
    formData.append('data', JSON.stringify(data))

    const { res: posts, error } = await createAd(artistId, formData)
    if (error) {
      setError(error)
      setIsLoading(false)
    }

    setPosts({
      type: 'add-posts-with-priority',
      payload: {
        status: 'pending',
        posts,
      },
    })

    setIsLoading(false)
    toggleSidePanel(false)
  }, [files, message, isDefaultLink, currentLink?.linkId, currentCallToAction, isDefaultCallToAction, artistId, campaignType, toggleSidePanel, setPosts, fileName])

  React.useEffect(() => {
    const button = (
      <Button
        onClick={save}
        trackComponentName="AdCreation"
        isDisabled={files.length === 0 || ! message}
        isLoading={isLoading}
        isSidePanel
      >
        Save
      </Button>
    )

    setSidePanelButton(button)
  }, [setSidePanelButton, save, message, files, isLoading])

  return (
    <div className="pr-10">
      <h2 className="mb-8">Create ad</h2>
      <p className="font-bold">1. Upload file</p>
      <FileUpload
        files={files}
        setFiles={setFiles}
        setFileName={setFileName}
      />
      <p className="font-bold">2. Enter a caption</p>
      <TextArea
        name="message"
        value={message}
        handleChange={handleChange}
        placeholder="Type a caption for your ad..."
      />
      <p className="font-bold">3. Link and CTA</p>
      <PostLinkCheckBoxSelect
        campaignType={campaignType}
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
        isDefaultLink={isDefaultLink}
        setIsDefaultLink={setIsDefaultLink}
      />
      <PostCallToActionCheckboxSelect
        campaignType={campaignType}
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

AdCreation.propTypes = {
  setPosts: PropTypes.func.isRequired,
}

export default AdCreation

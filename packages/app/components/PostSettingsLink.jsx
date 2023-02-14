import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'
import PostSettingsSaveButton from '@/app/PostSettingsSaveButton'
import PostLinkCheckBoxSelect from '@/app/PostLinkCheckBoxSelect'
import PostSettingsEditAlert from '@/app/PostSettingsEditAlert'
import Error from '@/elements/Error'
import { setPostLink } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
})

const PostSettingsLink = ({
  post,
  campaignType,
  updatePost,
  isDisabled,
}) => {
  const { id: postId, promotionStatus } = post
  const isPostActive = promotionStatus === 'active'
  const { defaultLink } = useControlsStore(getControlsStoreState)

  const [links, setLinks] = React.useState(post.links || [])
  const [currentLink, setCurrentLink] = React.useState({})
  const [savedLink, setSavedLink] = React.useState(currentLink)
  const [isDefaultLink, setIsDefaultLink] = React.useState(true)
  const [shouldShowSaveButton, setShouldShowSaveButton] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [onAlertConfirm, setOnAlertConfirm] = React.useState(() => () => {})

  const { artistId } = React.useContext(ArtistContext)

  const updatePostState = (link) => {
    const index = links.findIndex(({ campaignType }) => campaignType === link.campaignType)

    const updatedLinks = produce(links, (draftState) => {
      if (index !== -1) {
        draftState[index].linkId = link.linkId
        return
      }

      draftState.push(link)
    })

    setLinks(updatedLinks)
    setSavedLink(link)

    updatePost({
      type: 'update-links',
      payload: {
        postId,
        links: updatedLinks,
      },
    })
  }

  const save = async (forceRun = false) => {
    if (isPostActive && ! forceRun) {
      setOnAlertConfirm(() => () => save(true))
      setShouldShowAlert(true)

      return
    }

    setIsLoading(true)

    const { res: link, error } = await setPostLink({
      artistId,
      linkId: isDefaultLink ? defaultLink?.id : currentLink.linkId,
      assetId: postId,
      campaignType,
      id: currentLink?.id,
    })

    if (error) {
      setError(error)
      setIsLoading(false)

      return
    }

    setShouldShowSaveButton(false)
    updatePostState(link)

    if (currentLink.linkId === defaultLink?.id) {
      setIsDefaultLink(true)
    }

    setIsLoading(false)
  }

  const onConfirm = () => {
    onAlertConfirm()
    setShouldShowAlert(false)
  }

  const onCancel = () => {
    setCurrentLink(savedLink)

    if (isDefaultLink) {
      setIsDefaultLink((defaultLink) => ! defaultLink)
    }
    setShouldShowAlert(false)
  }

  React.useEffect(() => {
    if (isDefaultLink) {
      setShouldShowSaveButton(savedLink?.linkId !== defaultLink?.id)
    }

    if (! isDefaultLink) {
      setShouldShowSaveButton(savedLink?.linkId !== currentLink.linkId)
    }
  }, [isDefaultLink, currentLink.linkId, savedLink.linkId, defaultLink?.id])

  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <p className={[
          'text-lg font-bold',
          isDisabled ? 'text-grey' : null,
        ].join(' ')}
        >
          Link
        </p>
        <PostSettingsSaveButton
          onClick={() => save()}
          shouldShow={shouldShowSaveButton}
          isLoading={isLoading}
        />
      </div>
      <PostLinkCheckBoxSelect
        post={post}
        campaignType={campaignType}
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
        isDefaultLink={isDefaultLink}
        setIsDefaultLink={setIsDefaultLink}
        setSavedLink={setSavedLink}
        links={links}
        setLinks={setLinks}
        updatePost={updatePost}
        isDisabled={isDisabled}
        className="sm:pl-4 break-all"
      />
      <Error error={error} />
      {shouldShowAlert && (
        <PostSettingsEditAlert
          type="link"
          shouldShowAlert={shouldShowAlert}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </div>
  )
}

PostSettingsLink.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

export default PostSettingsLink

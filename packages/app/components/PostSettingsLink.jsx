import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'
import PostSettingsSaveButton from '@/app/PostSettingsSaveButton'
import PostLinkCheckBoxSelect from '@/app/PostLinkCheckBoxSelect'
import PostSettingsEditAlert from '@/app/PostSettingsEditAlert'
import Error from '@/elements/Error'
import { setPostLink } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  optimizationPreferences: state.optimizationPreferences,
})

const PostSettingsLink = ({
  post,
  campaignType,
  updatePost,
  isDisabled,
}) => {
  const { id: postId, promotionStatus, linkSpecs } = post
  const isPostActive = promotionStatus === 'active'

  const { linkId, linkHref } = linkSpecs[campaignType] || {}
  const { defaultLink, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  const [currentLink, setCurrentLink] = React.useState({
    id: linkId || defaultLink.id,
    href: linkHref || defaultLink.href,
  })
  const [savedLink, setSavedLink] = React.useState(currentLink)

  const [isDefaultLink, setIsDefaultLink] = React.useState(true)
  const [shouldShowSaveButton, setShouldShowSaveButton] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [onAlertConfirm, setOnAlertConfirm] = React.useState(() => () => {})

  const { artistId } = React.useContext(ArtistContext)

  const save = async (forceRun = false) => {
    if (isPostActive && ! forceRun) {
      setOnAlertConfirm(() => () => save(true))
      setShouldShowAlert(true)

      return
    }

    setIsLoading(true)

    const { res: linkSpecs, error } = await setPostLink({
      artistId,
      linkId: isDefaultLink ? defaultLink?.id : currentLink.id,
      hasSalesObjective,
      assetId: post.id,
      campaignType,
    })

    if (error) {
      setError(error)
      setIsLoading(false)

      return
    }

    setSavedLink(currentLink)
    setShouldShowSaveButton(false)
    updatePost({
      type: 'update-link-specs',
      payload: {
        postId,
        linkSpecs,
      },
    })

    if (currentLink.id === defaultLink?.id) {
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
      setShouldShowSaveButton(savedLink?.id !== defaultLink?.id)
    }

    if (! isDefaultLink) {
      setShouldShowSaveButton(savedLink?.id !== currentLink.id)
    }
  }, [isDefaultLink, currentLink.id, savedLink.id, defaultLink?.id])

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
        isDisabled={isDisabled}
        className="sm:pl-4 break-all"
      />
      <Error error={error} />
      <PostSettingsEditAlert
        type="link"
        shouldShowAlert={shouldShowAlert}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
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

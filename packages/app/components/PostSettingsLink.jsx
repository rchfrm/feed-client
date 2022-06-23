import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import PostSettingsSaveButton from '@/app/PostSettingsSaveButton'
import PostLinksSelect from '@/app/PostLinksSelect'

import CheckboxInput from '@/elements/CheckboxInput'
import Error from '@/elements/Error'

import { setPostLink, getLinkById } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  nestedLinks: state.nestedLinks,
  optimizationPreferences: state.optimizationPreferences,
})

const PostSettingsLink = ({
  post,
  campaignType,
  updatePost,
  isDisabled,
}) => {
  const { linkSpecs } = post

  const { linkId, linkHref } = linkSpecs[campaignType] || {}
  const { defaultLink, nestedLinks, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  // Initial value is post level link, or default link
  const [currentLink, setCurrentLink] = React.useState({
    id: linkId || defaultLink.id,
    href: linkHref || defaultLink.href,
  })
  const [savedLink, setSavedLink] = React.useState(currentLink)

  const [isDefaultLink, setIsDefaultLink] = React.useState(true)
  const [shouldShowSaveButton, setShouldShowSaveButton] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  // Set current link on select change
  const updateLink = (linkId) => {
    setCurrentLink(getLinkById(nestedLinks, linkId))
  }

  const handleChange = () => {
    setIsDefaultLink(!isDefaultLink)

    if (!isDefaultLink) {
      setShouldShowSaveButton(savedLink?.id !== defaultLink?.id)
    }

    if (isDefaultLink) {
      setShouldShowSaveButton(savedLink?.id !== currentLink.id)
    }
  }

  // Save currently selected link and hide save button
  const save = async () => {
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
    updatePost('update-link-specs', { linkSpecs })

    if (currentLink.id === defaultLink?.id) {
      setIsDefaultLink(true)
    }

    setIsLoading(false)
  }

  // Watch for link id changes and show save button if there has been a change
  React.useEffect(() => {
    const hasChanged = currentLink.id !== savedLink.id

    setShouldShowSaveButton(hasChanged)
  }, [currentLink.id, savedLink.id])

  // On initial mount and on campaign type change set the current link
  React.useEffect(() => {
    const { linkId, linkHref } = linkSpecs[campaignType] || {}

    const link = {
      id: linkId || defaultLink.id,
      href: linkHref || defaultLink.href,
    }

    setCurrentLink(link)
    setSavedLink(link)

    if (linkId && linkId !== defaultLink.id) {
      setIsDefaultLink(false)
    }
  }, [campaignType, linkSpecs, defaultLink?.id, defaultLink?.href])

  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <p className={[
          'text-lg font-bold',
          isDisabled ? 'text-grey-2' : null,
        ].join(' ')}
        >
          Link
        </p>
        <PostSettingsSaveButton
          onClick={save}
          shouldShow={shouldShowSaveButton}
          isLoading={isLoading}
        />
      </div>
      <CheckboxInput
        buttonLabel={`Use default (${defaultLink.href})`}
        value="link"
        checked={isDefaultLink}
        onChange={handleChange}
        className="sm:pl-2 break-all"
        disabled={isDisabled}
      />
      {!isDefaultLink && (
        <PostLinksSelect
          currentLinkId={currentLink.id}
          updateParentLink={updateLink}
          shouldSaveOnChange={false}
          componentLocation="post"
          campaignType={campaignType}
          includeAddLinkOption
          disabled={isDisabled}
          className="sm:pl-4"
        />
      )}
      <Error error={error} />
    </div>
  )
}

PostSettingsLink.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

PostSettingsLink.defaultProps = {
}

export default PostSettingsLink

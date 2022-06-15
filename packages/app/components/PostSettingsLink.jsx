import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import PostLinksSelect from '@/app/PostLinksSelect'

import CheckboxInput from '@/elements/CheckboxInput'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import { setPostLink, getLinkById } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  nestedLinks: state.nestedLinks,
  optimizationPreferences: state.optimizationPreferences,
})

const PostSettingsLink = ({
  post,
  campaignType,
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
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  // Set current link on select change
  const updateLink = (linkId) => {
    setCurrentLink(getLinkById(nestedLinks, linkId))
  }

  const handleChange = () => {
    setIsDefaultLink(!isDefaultLink)

    if (!isDefaultLink) {
      setCurrentLink(defaultLink)
    }
  }

  // Save currently selected link and hide save button
  const save = async () => {
    const { error } = await setPostLink({
      artistId,
      linkId: currentLink.id,
      hasSalesObjective,
      assetId: post.id,
      campaignType,
    })

    if (error) {
      setError(error)
      return
    }

    setSavedLink(currentLink)
    setShouldShowSaveButton(false)

    if (currentLink.id === defaultLink.id) {
      setIsDefaultLink(true)
    }
  }

  // Watch for link id changes and show save button if there has been a change
  React.useEffect(() => {
    const hasChanged = currentLink.id !== savedLink.id

    setShouldShowSaveButton(hasChanged)
  }, [currentLink.id, savedLink.id])

  // On initial mount and on campaign type change set the current link
  React.useEffect(() => {
    const { linkId, linkHref } = linkSpecs[campaignType] || {}

    setCurrentLink({
      id: linkId || defaultLink.id,
      href: linkHref || defaultLink.href,
    })

    if (linkId && linkId !== defaultLink.id) {
      setIsDefaultLink(false)
    }

    setIsLoading(false)
  }, [campaignType, linkSpecs, defaultLink.id, defaultLink.href])

  if (isLoading) return <Spinner className="h-64 flex items-center" width={28} />

  return (
    <>
      <div className="flex justify-between">
        <p className="text-lg font-bold">Link</p>
        {shouldShowSaveButton && (
          <Button
            version="green small"
            className={[
              'h-8',
              'rounded-full',
            ].join(' ')}
            onClick={save}
            trackComponentName="PostSettings"
          >
            Save
          </Button>
        )}
      </div>
      <CheckboxInput
        buttonLabel={`Use default (${defaultLink.href})`}
        value="link"
        checked={isDefaultLink}
        onChange={handleChange}
      />
      {!isDefaultLink && (
        <PostLinksSelect
          currentLinkId={currentLink.id}
          updateParentLink={updateLink}
          shouldSaveOnChange={false}
          componentLocation="post"
          campaignType={campaignType}
          includeAddLinkOption
        />
      )}
      <Error error={error} />
    </>
  )
}

PostSettingsLink.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
}

PostSettingsLink.defaultProps = {
}

export default PostSettingsLink

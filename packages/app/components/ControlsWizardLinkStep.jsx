import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'

import { setDefaultLink, getLinkById } from '@/app/helpers/linksHelpers'
import PostLinksSelect from '@/app/PostLinksSelect'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import PencilIcon from '@/icons/PencilIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  savedFolders: state.savedFolders,
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
  updatePreferences: state.updatePreferences,
  defaultLink: state.defaultLink,
})

const ControlsWizardLinkStep = () => {
  const { nestedLinks, updateLinks, updatePreferences, defaultLink } = useControlsStore(getControlsStoreState)
  const [link, setLink] = React.useState(defaultLink)
  const [linkId, setLinkId] = React.useState(defaultLink?.id)
  const [isEditMode, setIsEditMode] = React.useState(!defaultLink?.id)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)
  const { artistId, setPostPreferences } = React.useContext(ArtistContext)

  // Set link id on select change
  const updateLink = (linkId) => {
    setLinkId(linkId)
  }

  // Update the link object on link id change
  React.useEffect(() => {
    setLink(getLinkById(nestedLinks, linkId))
  }, [nestedLinks, linkId])

  const saveAsDefaultLink = async (newLinkId) => {
    if (newLinkId) {
      setIsLoading(true)
      const { res: newArtist, error } = await setDefaultLink(artistId, newLinkId)
      if (error) {
        const setDefaultLinkError = `Error setting link as default: ${error.message}`
        setError({ message: setDefaultLinkError })
        setIsLoading(false)
        return
      }
      // Update controls store
      const { preferences: { posts: { default_link_id } } } = newArtist
      // Set the new link as the default link
      updateLinks('chooseNewDefaultLink', { newArtist })
      // Update the post preferences object
      updatePreferences(
        'postsPreferences',
        { defaultLinkId: default_link_id },
      )
      // Update artist status
      setPostPreferences('default_link_id', default_link_id)
      setIsLoading(false)
    }
  }

  const handleNext = async () => {
    if (!linkId) return
    // Skip api request if the link hasn't changed
    if (linkId === defaultLink.id) {
      next()
      return
    }
    // Otherwise save the link as default link
    await saveAsDefaultLink(linkId)
    next()
  }

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardLinkStepIntro} />
      {isEditMode
        ? (
          <PostLinksSelect
            currentLinkId={linkId}
            updateParentLink={updateLink}
            shouldSaveOnChange={false}
            componentLocation="defaultLink"
            includeAddLinkOption
          />
        ) : (
          <div className="flex justify-between items-center mb-8">
            <p className="break-all mb-0">{link.href}</p>
            <Button
              version="green small icon"
              className="h-8 ml-3 rounded-full"
              onClick={() => setIsEditMode(true)}
              trackComponentName="ControlsWizardLinkStep"
            >
              <PencilIcon fill={brandColors.white} />
              Edit
            </Button>
          </div>
        )}
      <Error error={error} />
      <Button
        version="outline-green icon"
        spinnerFill={brandColors.black}
        onClick={handleNext}
        className="w-1/3 ml-auto mb-6"
        loading={isLoading}
        trackComponentName="ControlsWizardLinkStep"
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
    </>
  )
}

ControlsWizardLinkStep.propTypes = {
}

export default ControlsWizardLinkStep

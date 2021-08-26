import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'

import { saveLink, setDefaultLink, splitLinks, getLinkById } from '@/app/helpers/linksHelpers'
import PostLinksSelect from '@/app/PostLinksSelect'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Input from '@/elements/Input'
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
  const { savedFolders, nestedLinks, updateLinks, updatePreferences, defaultLink } = useControlsStore(getControlsStoreState)
  const [link, setLink] = React.useState(defaultLink || {})
  const [isEditMode, setIsEditMode] = React.useState(!link.href)
  const [hasLooseLinks, setHasLooseLinks] = React.useState(false)
  const [hasSingleLooseLink, setHasSingleLooseLink] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)
  const { artistId, setPostPreferences } = React.useContext(ArtistContext)

  React.useEffect(() => {
    const { looseLinks } = splitLinks(nestedLinks)
    // Render either a text input field or select element based on this boolean
    setHasLooseLinks(looseLinks.length > 1)

    // If there's no default link and only 1 loose link, prefill the text field with this value
    if (Object.keys(defaultLink).length === 0 && looseLinks.length === 1) {
      setLink(looseLinks[0])
      setHasSingleLooseLink(true)
    }
  }, [nestedLinks, defaultLink])

  // On text input change update the link object with a name and href
  const handleChange = (e) => {
    setLink({ ...link, name: 'default link', href: e.target.value })
  }

  // On select change update the link object
  const updateLink = (linkId, link) => {
    if (link) {
      setLink(link)
      return
    }
    setLink(getLinkById(nestedLinks, linkId))
  }

  const saveAsDefaultLink = async (newLinkId, newLink) => {
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
      updateLinks('chooseNewDefaultLink', { newArtist, newLink })
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

  const saveLinkToLinkBank = async (action) => {
    setIsLoading(true)
    const { res: savedLink, error } = await saveLink(artistId, link, savedFolders, action)
    if (error) {
      const saveLinkError = `Error saving link: ${error.message}`
      setError({ message: saveLinkError })
      setIsLoading(false)
      return
    }
    // Add the new link to the controls store
    updateLinks(action, { newLink: savedLink, oldLink: link })
    // Update local state
    updateLink(savedLink.id, savedLink)
    setIsLoading(false)
    return savedLink
  }

  const handleNext = async () => {
    let action = 'add'
    if (link.id) action = 'edit'

    if (hasLooseLinks) {
      // Skip api request if the link hasn't changed
      if (link.id === defaultLink.id) {
        next()
        return
      }
      // Otherwise save the link as default link
      saveAsDefaultLink(link.id)
      next()
      return
    }

    // Skip api request if the link hasn't changed
    if (link.href === defaultLink.href) {
      next()
      return
    }
    // Add the link to the linkbank or edit the linkbank link based on the action parameter
    const savedLink = await saveLinkToLinkBank(action)
    if (action === 'add' || hasSingleLooseLink) {
      await saveAsDefaultLink(savedLink.id, savedLink)
    }
    next()
  }

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardLinkStepIntro} />
      {isEditMode
        ? hasLooseLinks
          ? (
            <PostLinksSelect
              currentLinkId={link.id}
              updateParentLink={updateLink}
              shouldSaveOnChange={false}
              componentLocation="defaultLink"
            />
          ) : (
            <Input
              placeholder="https://"
              type="url"
              version="box"
              name="link-url"
              value={link.href}
              handleChange={handleChange}
            />
          )
        : (
          <div className="flex justify-between items-center mb-8">
            <p className="break-all mb-0">{link.href}</p>
            <Button
              version="green small icon"
              className="h-8 ml-3 rounded-full"
              onClick={() => setIsEditMode(true)}
            >
              <PencilIcon fill={brandColors.white} />
              Edit
            </Button>
          </div>
        )}
      <Error error={error} />
      <Button
        version="green icon"
        onClick={handleNext}
        className="w-full mb-6"
        loading={isLoading}
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          fill={brandColors.white}
          direction="right"
        />
      </Button>
      <MarkdownText markdown={copy.controlsWizardLinkStepOutro} />
    </>
  )
}

ControlsWizardLinkStep.propTypes = {
}

export default ControlsWizardLinkStep

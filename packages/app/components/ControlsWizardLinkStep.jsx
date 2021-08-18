import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'

import { saveLink, setDefaultLink } from '@/app/helpers/linksHelpers'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Input from '@/elements/Input'
import Error from '@/elements/Error'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import PencilIcon from '@/icons/PencilIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  artistId: state.artistId,
  savedFolders: state.savedFolders,
  updateLinks: state.updateLinks,
  updatePreferences: state.updatePreferences,
  defaultLink: state.defaultLink,
})

const ControlsWizardLinkStep = () => {
  const { savedFolders, updateLinks, updatePreferences, defaultLink } = useControlsStore(getControlsStoreState)
  const { href } = defaultLink || {}
  const [isEditMode, setIsEditMode] = React.useState(!href)
  const [link, setLink] = React.useState({ name: 'Default link', href })
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)
  const { artistId, setPostPreferences } = React.useContext(ArtistContext)

  const handleChange = (e) => {
    setLink({ ...link, href: e.target.value })
  }

  const saveDefaultLink = async () => {
    setIsLoading(true)
    const { res: savedLink, error } = await saveLink(artistId, link, savedFolders)
    if (error) {
      const saveLinkError = `Error saving link: ${error.message}`
      setError({ message: saveLinkError })
      setIsLoading(false)
      return
    }
    if (savedLink) {
      const { res: newArtist, error } = await setDefaultLink(artistId, savedLink.id)
      setIsLoading(false)
      if (error) {
        const setDefaultLinkError = `Error setting link as default: ${error.message}`
        setError({ message: setDefaultLinkError })
        return
      }
      // Update controls store
      const { preferences: { posts: { default_link_id } } } = newArtist
      // Add the new link to the controls store
      updateLinks('add', { newLink: savedLink })
      // Set the new link as the default link
      updateLinks('chooseNewDefaultLink', { newArtist, newLink: savedLink })
      // Update the post preferences object
      updatePreferences(
        'postsPreferences',
        { defaultLinkId: default_link_id },
      )
      // Update artist status
      setPostPreferences('default_link_id', default_link_id)
    }
    next()
  }

  const handleNext = () => {
    if (link.href === href) {
      next()
      return
    }
    saveDefaultLink()
  }

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardLinkStepIntro} />
      {isEditMode ? (
        <Input
          placeholder="https://"
          type="url"
          version="box"
          name="link-url"
          value={link.href}
          handleChange={handleChange}
        />
      ) : (
        <div className="flex justify-between items-center mb-8">
          <p className="mb-0">{href}</p>
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

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

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  artistId: state.artistId,
  savedFolders: state.savedFolders,
  updateControlsStore: state.updateControlsStore,
  updatePreferences: state.updatePreferences,
})

const ControlsWizardLinkStep = ({ setIsWizardActive }) => {
  const [link, setLink] = React.useState({ name: 'Default link', href: '' })
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)
  const { artistId, setPostPreferences } = React.useContext(ArtistContext)
  const { savedFolders, updateControlsStore, updatePreferences } = useControlsStore(getControlsStoreState)

  React.useEffect(() => {
    setIsWizardActive(true)
  }, [setIsWizardActive])

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
      updateControlsStore('add', { newLink: savedLink })
      // Set the new link as the default link
      updateControlsStore('chooseNewDefaultLink', { newArtist, newLink: savedLink })
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

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardLinkStepIntro} />
      <Input
        placeholder="https://"
        type="url"
        version="box"
        name="link-url"
        value={link.href}
        handleChange={handleChange}
      />
      <Error error={error} />
      <Button
        version="green icon"
        onClick={saveDefaultLink}
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

import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'

import { saveLink, setDefaultLink, getLinkById, validateLink } from '@/app/helpers/linksHelpers'

import Button from '@/elements/Button'
import Input from '@/elements/Input'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import MarkdownText from '@/elements/MarkdownText'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  savedFolders: state.savedFolders,
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
  defaultLink: state.defaultLink,
})

const GetStartedDefaultLink = () => {
  const {
    savedFolders,
    nestedLinks,
    updateLinks,
    optimizationPreferences,
    updatePreferences,
    defaultLink,
  } = useControlsStore(getControlsStoreState)

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { objective: storedObjective, platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState || {}

  const [link, setLink] = React.useState(defaultLink || storedDefaultLink || {})
  const [error, setError] = React.useState(null)

  const { next } = React.useContext(WizardContext)
  const { artistId, setPostPreferences } = React.useContext(ArtistContext)

  const objective = optimizationPreferences?.objective || storedObjective
  const platform = optimizationPreferences?.platform || storedPlatform

  // On text input change update the link object with a name and href
  const handleChange = (e) => {
    setError(null)

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
      const { res: newArtist, error } = await setDefaultLink(artistId, newLinkId)

      if (error) {
        const setDefaultLinkError = `Error setting link as default: ${error.message}`

        setError({ message: setDefaultLinkError })
        return
      }
      // Update controls store
      const { preferences: { posts: { default_link_id } } } = newArtist

      // Set the new link as the default link
      updateLinks('chooseNewDefaultLink', { newArtist, newLink })

      // Update the post preferences object
      updatePreferences({
        postsPreferences: {
          defaultLinkId: default_link_id,
        },
      })

      // Update artist status
      setPostPreferences('default_link_id', default_link_id)
    }
  }

  const saveLinkToLinkBank = async (action) => {
    const { res: savedLink, error } = await saveLink(artistId, link, savedFolders, action)

    if (error) {
      const saveLinkError = `Error saving link: ${error.message}`
      setError({ message: saveLinkError })

      return
    }

    // Add the new link to the controls store
    updateLinks(action, { newLink: savedLink, oldLink: link })

    // Update local state
    updateLink(savedLink.id, savedLink)

    return savedLink
  }

  const handleNext = async () => {
    // If there's no connected account yet validate the link and store the data in local storage
    if (!artistId) {
      // If the link hasn't change there's no need to validate it
      if (link.href === storedDefaultLink?.href) {
        next()
        return
      }

      const { res, error } = await validateLink(link.href)

      if (error) {
        setError(error)
        return
      }

      const { isValid, reason } = res

      if (!isValid) {
        setError({ message: copy.invalidLinkReason(reason) })
        return
      }

      setLocalStorage('getStartedWizard', JSON.stringify({ ...wizardState, defaultLink: link }))
      next()

      return
    }

    // Otherwise save the data in the db
    let action = 'add'

    // Edit the link if the link already exists in the linkbank, unless it's a facebook or instagram link since these are read-only
    if (link.id && (link.platform !== 'facebook' && link.platform !== 'instagram')) {
      action = 'edit'
    }

    // Skip api request if the link hasn't changed
    if (link.href && (link.href === defaultLink.href)) {
      next()
      return
    }

    // Add the link to the linkbank or edit the linkbank link based on the action parameter
    const savedLink = await saveLinkToLinkBank(action)

    if (!savedLink) return

    if (action === 'add') {
      await saveAsDefaultLink(savedLink.id, savedLink)
    }
    next()
  }

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="mb-4 font-medium text-xl">{copy.defaultLinkSubtitle(objective, platform)}</h3>
      <MarkdownText className="hidden xs:block sm:w-2/3 text-grey-3 italic" markdown={copy.defaultLinkDescription(objective)} />
      <Error error={error} />
      <div className="flex flex-1 flex-column w-full sm:w-1/3 mx-auto justify-center items-center">
        <Input
          name="link-url"
          version="box"
          type="url"
          value={link.href}
          handleChange={handleChange}
          placeholder="https://"
          className="w-full mb-12"
        />
        <Button
          version="green"
          onClick={handleNext}
          className="w-full sm:w-48"
          trackComponentName="GetStartedDefaultLink"
        >
          Save
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill="white"
          />
        </Button>
      </div>
    </div>
  )
}

GetStartedDefaultLink.propTypes = {
}

GetStartedDefaultLink.defaultProps = {
}

export default GetStartedDefaultLink

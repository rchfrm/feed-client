import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'
import useSaveLinkToLinkBank from '@/app/hooks/useSaveLinkToLinkBank'
import useSaveIntegrationLink from '@/app/hooks/useSaveIntegrationLink'

import DefaultLinkForm from '@/app/DefaultLinkForm'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowIcon from '@/icons/ArrowIcon'

import { setDefaultLink, getLinkById, getLinkByHref, validateLink } from '@/app/helpers/linksHelpers'
import { getLocalStorage, setLocalStorage } from '@/helpers/utils'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
  optimizationPreferences: state.optimizationPreferences,
  updatePreferences: state.updatePreferences,
  defaultLink: state.defaultLink,
})

const GetStartedDefaultLink = () => {
  const {
    nestedLinks,
    updateLinks,
    optimizationPreferences,
    updatePreferences,
    defaultLink,
  } = useControlsStore(getControlsStoreState)

  const { artistId, setPostPreferences } = React.useContext(ArtistContext)

  const wizardState = ! artistId ? (JSON.parse(getLocalStorage('getStartedWizard')) || {}) : {}
  const { objective: storedObjective, platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState || {}

  const [link, setLink] = React.useState(defaultLink || storedDefaultLink || {})
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [isDisabled, setIsDisabled] = React.useState(false)

  const { next } = React.useContext(WizardContext)


  const saveLinkToLinkBank = useSaveLinkToLinkBank()
  const saveIntegrationLink = useSaveIntegrationLink()

  const objective = optimizationPreferences?.objective || storedObjective
  const platform = optimizationPreferences?.platform || storedPlatform
  const isInstagram = platform === 'instagram'

  const updateLink = (linkId, link) => {
    if (link) {
      setLink(link)
      return
    }
    setLink(getLinkById(nestedLinks, linkId))
  }

  const saveAsDefaultLink = async (newLinkId, newLink) => {
    if (newLinkId) {
      const { res: newArtist, error } = await setDefaultLink({ artistId, linkId: newLinkId })

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

  const validateAndStoreLink = async () => {
    // If the link hasn't changed there's no need to validate it
    if (link.href === storedDefaultLink?.href) {
      next()
      return
    }

    // Validate the link
    const { res, error } = await validateLink(link.href)

    if (error) {
      setError(error)
      return
    }

    const { isValid, reason } = res

    if (! isValid) {
      setError({ message: copy.invalidLinkReason(reason) })
      return
    }

    setLocalStorage('getStartedWizard', JSON.stringify({ ...wizardState, defaultLink: link }))
    next()
  }

  const onSubmit = async (e) => {
    if (e) e.preventDefault()

    // If there's no connected profile yet validate the link and store the data in local storage
    if (! artistId) {
      await validateAndStoreLink()

      return
    }

    // Otherwise save the data in the db
    const action = 'add'
    setIsLoading(true)

    // Check if the link already exists in the linkbank
    const existingLink = getLinkByHref(nestedLinks, link.href)
    const currentLink = existingLink || link

    // Skip api request if the link hasn't changed
    if (currentLink.href && (currentLink.href === defaultLink.href)) {
      setIsLoading(false)
      next()
      return
    }

    let savedLink = ''

    if (! isInstagram) {
      // Save the link in the linkbank as integration link
      const { savedLink: integrationLink, error } = await saveIntegrationLink({ platform }, currentLink.href)

      if (error) {
        setError(error)
        setIsLoading(false)

        return
      }

      savedLink = integrationLink
    } else {
      // Save the link in the linkbank or edit the linkbank link based on the action parameter
      const { savedLink: linkBankLink, error } = await saveLinkToLinkBank(currentLink, action)

      if (error) {
        setError(error)
        setIsLoading(false)

        return
      }

      savedLink = linkBankLink
    }

    if (! savedLink) {
      setIsLoading(false)
      return
    }

    // Update local state
    updateLink(savedLink.id, savedLink)

    if (savedLink.id !== defaultLink.id) {
      await saveAsDefaultLink(savedLink.id, savedLink)
    }

    setIsLoading(false)
    next()
  }

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="mb-4 font-medium text-lg">{copy.defaultLinkSubtitle(platform)}</h3>
      <Error error={error} />
      <form
        onSubmit={onSubmit}
        className="flex flex-1 flex-column w-full sm:w-1/3 mx-auto justify-center items-center"
      >
        <DefaultLinkForm
          link={link}
          setLink={setLink}
          objective={objective}
          platform={platform}
          error={error}
          setError={setError}
          setIsDisabled={setIsDisabled}
        />
        <Button
          type="submit"
          className="w-full sm:w-48 mt-8"
          trackComponentName="GetStartedDefaultLink"
          isDisabled={isDisabled}
          isLoading={isLoading}
        >
          Save
          <ArrowIcon
            className="w-7 h-auto ml-1"
            direction="right"
          />
        </Button>
      </form>
    </div>
  )
}

GetStartedDefaultLink.propTypes = {
}

GetStartedDefaultLink.defaultProps = {
}

export default GetStartedDefaultLink

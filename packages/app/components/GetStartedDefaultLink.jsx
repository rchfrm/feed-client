import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'
import useSaveLinkToLinkBank from '@/app/hooks/useSaveLinkToLinkBank'
import useSaveIntegrationLink from '@/app/hooks/useSaveIntegrationLink'

import { setDefaultLink, getLinkById, validateLink } from '@/app/helpers/linksHelpers'

import Button from '@/elements/Button'
import Input from '@/elements/Input'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import MarkdownText from '@/elements/MarkdownText'

import { getLocalStorage, setLocalStorage, enforceUrlProtocol } from '@/helpers/utils'
import { testValidIntegration, getIntegrationInfo } from '@/helpers/integrationHelpers'

import copy from '@/app/copy/getStartedCopy'
import brandColors from '@/constants/brandColors'

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

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { objective: storedObjective, platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState || {}

  const [link, setLink] = React.useState(defaultLink || storedDefaultLink || {})
  const [placeholder, setPlaceholder] = React.useState('https://')
  const [isSaveEnabled, setIsSaveEnabled] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { next } = React.useContext(WizardContext)
  const { artistId, setPostPreferences } = React.useContext(ArtistContext)

  const saveLinkToLinkBank = useSaveLinkToLinkBank()
  const saveIntegrationLink = useSaveIntegrationLink()

  const objective = optimizationPreferences?.objective || storedObjective
  const platform = optimizationPreferences?.platform || storedPlatform
  const isFacebookOrInstagram = platform === 'facebook' || platform === 'instagram'
  const hasGrowthObjective = objective === 'growth'
  const hasSalesObjective = objective === 'sales'

  // On text input change update the link object with a name and href
  const handleChange = (e) => {
    setError(null)

    setLink({ ...link, name: 'default link', href: e.target.value })
  }

  const updateLink = (linkId, link) => {
    if (link) {
      setLink(link)
      return
    }
    setLink(getLinkById(nestedLinks, linkId))
  }

  const saveAsDefaultLink = async (newLinkId, newLink) => {
    if (newLinkId) {
      const { res: newArtist, error } = await setDefaultLink({ artistId, linkId: newLinkId, hasSalesObjective })

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
        ...(hasSalesObjective && {
          conversionsPreferences: {
            defaultLinkId: default_link_id,
          },
        }),
      })

      // Update artist status
      setPostPreferences('default_link_id', default_link_id)
    }
  }

  const validateAndStoreLink = async () => {
    // If the link hasn't change there's no need to validate it
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

    if (!isValid) {
      setError({ message: copy.invalidLinkReason(reason) })
      return
    }

    setLocalStorage('getStartedWizard', JSON.stringify({ ...wizardState, defaultLink: link }))
    next()
  }

  const handleNext = async () => {
    // If there's no connected profile yet validate the link and store the data in local storage
    if (!artistId) {
      await validateAndStoreLink()

      return
    }

    // Otherwise save the data in the db
    let action = 'add'

    // Edit the link if the link already exists in the linkbank and it's not an integration link
    if (link.id && !hasGrowthObjective) {
      action = 'edit'
    }

    // Skip api request if the link hasn't changed
    if (link.href && (link.href === defaultLink.href)) {
      next()
      return
    }

    let savedLink = ''

    if (hasGrowthObjective && !isFacebookOrInstagram) {
      // Save the link in the linkbank as integration link
      const { savedLink: integrationLink, error } = await saveIntegrationLink({ platform }, link.href)

      if (error) {
        setError(error)
        return
      }

      savedLink = integrationLink
    } else {
      // Save the link in the linkbank or edit the linkbank link based on the action parameter
      const { savedLink: linkBankLink, error } = await saveLinkToLinkBank(link, action)

      if (error) {
        setError(error)
        return
      }

      savedLink = linkBankLink
    }

    if (!savedLink) return

    // Update local state
    updateLink(savedLink.id, savedLink)

    if (action === 'add') {
      await saveAsDefaultLink(savedLink.id, savedLink)
    }

    next()
  }

  React.useEffect(() => {
    if (objective === 'growth') {
      const { placeholderUrl } = getIntegrationInfo({ platform })

      setPlaceholder(placeholderUrl)
    }
  }, [objective, platform])

  React.useEffect(() => {
    if (objective !== 'growth') {
      setIsSaveEnabled(!!link.href)
      return
    }

    const sanitisedLink = enforceUrlProtocol(link.href, true)
    const hasError = !testValidIntegration(sanitisedLink, platform)

    setIsSaveEnabled(!!link.href && !hasError)
  }, [objective, platform, link])

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
          placeholder={placeholder}
          className="w-full mb-12"
        />
        <Button
          version="green"
          onClick={handleNext}
          className="w-full sm:w-48"
          trackComponentName="GetStartedDefaultLink"
          disabled={!isSaveEnabled}
        >
          Save
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill={isSaveEnabled ? brandColors.white : brandColors.greyDark}
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

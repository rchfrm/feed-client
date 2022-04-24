import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useControlsStore from '@/app/stores/controlsStore'
import useSaveLinkToLinkBank from '@/app/hooks/useSaveLinkToLinkBank'
import useSaveIntegrationLink from '@/app/hooks/useSaveIntegrationLink'

import PostLinksSelect from '@/app/PostLinksSelect'

import Button from '@/elements/Button'
import Input from '@/elements/Input'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'

import { getIntegrationInfo, testValidIntegration } from '@/helpers/integrationHelpers'
import { getLinkById, getLinkByPlatform, getLinkByHref, splitLinks } from '@/app/helpers/linksHelpers'
import { enforceUrlProtocol } from '@/helpers/utils'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
})

const ObjectiveSettingsChangeAlertDefaultLink = ({
  shouldSave,
  setShouldSave,
  setIsDisabled,
  objective,
  platform,
  setForceSave,
}) => {
  const hasGrowthObjective = objective === 'growth'
  const defaultPlaceholder = 'https://'

  const {
    nestedLinks,
  } = useControlsStore(getControlsStoreState)

  const saveIntegrationLink = useSaveIntegrationLink()
  const saveLinkToLinkBank = useSaveLinkToLinkBank()

  const [link, setLink] = React.useState({})
  const [error, setError] = React.useState(null)
  const [placeholder, setPlaceholder] = React.useState(defaultPlaceholder)
  const [shouldShowSelect, setShouldShowSelect] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  const { looseLinks } = splitLinks(nestedLinks)
  const isFacebookOrInstagram = platform === 'facebook' || platform === 'instagram'

  React.useEffect(() => {
    // if (isLoading) return

    // Render either a select element or text input field based on this boolean
    setShouldShowSelect(!hasGrowthObjective && looseLinks.length > 0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    if (error) {
      setError(null)
    }

    setLink({ ...link, name: 'default link', href: e.target.value })
  }

  const updateLink = (linkId, link) => {
    if (link) {
      setLink(link)
      return
    }
    setLink(getLinkById(nestedLinks, linkId))
  }

  // Hide select element and show text input field
  const toggleSelect = () => {
    if (shouldShowSelect) {
      setLink({})
    }

    setShouldShowSelect((shouldShowSelect) => !shouldShowSelect)
  }

  const saveLink = async () => {
    // Otherwise save the data in the db
    let action = 'add'
    setIsLoading(true)

    // Check if the link already exists in the linkbank
    const existingLink = getLinkByHref(nestedLinks, link.href)
    const currentLink = existingLink || link

    // Edit the link if the link already exists in the linkbank and it's not an integration link
    if (currentLink.id && !hasGrowthObjective) {
      action = 'edit'
    }

    if (hasGrowthObjective && !isFacebookOrInstagram) {
      // Save the link in the linkbank as integration link
      return saveIntegrationLink({ platform }, currentLink.href)
    }

    // Save the link in the linkbank or edit the linkbank link based on the action parameter
    return saveLinkToLinkBank(currentLink, action)
  }

  React.useEffect(() => {
    if (hasGrowthObjective) {
      const { placeholderUrl } = getIntegrationInfo({ platform })

      setPlaceholder(placeholderUrl)
      return
    }
    setPlaceholder(defaultPlaceholder)
  }, [hasGrowthObjective, objective, platform])

  React.useEffect(() => {
    if (!hasGrowthObjective) {
      setIsDisabled(!link.href)
      return
    }

    const sanitisedLink = enforceUrlProtocol(link.href, true)
    const hasError = !testValidIntegration(sanitisedLink, platform)

    setIsDisabled(!link.href || hasError)
  }, [hasGrowthObjective, objective, platform, link, setIsDisabled])

  useAsyncEffect(async () => {
    if (shouldSave) {
      const { error } = await saveLink()

      setIsLoading(false)

      if (error) {
        setError(error)
        return
      }

      setShouldSave(false)
    }
  }, [shouldSave, setShouldSave])

  React.useEffect(() => {
    const integrationLink = getLinkByPlatform(nestedLinks, platform)

    if (hasGrowthObjective && Boolean(integrationLink.accountId)) {
      setForceSave(true)
      return
    }

    setIsLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <Spinner className="h-48 flex items-center" width={28} />

  return (
    <>
      <h2>{copy.alertLinkTitle(objective, platform)}</h2>
      <MarkdownText markdown={copy.alertLinkDescription(objective, platform)} className="text-grey-3 italic" />
      <Error error={error} />
      {shouldShowSelect ? (
        <PostLinksSelect
          currentLinkId={link.id}
          updateParentLink={updateLink}
          shouldSaveOnChange={false}
          shouldShowAddLinkModal={false}
          onAddNewLink={toggleSelect}
          componentLocation="defaultLink"
          includeIntegrationLinks={false}
          includeAddLinkOption
          className="w-full mb-6"
        />
      ) : (
        <>
          <Input
            name="link-url"
            version="box"
            type="url"
            value={link.href}
            handleChange={handleChange}
            placeholder={placeholder}
            className="w-full mb-2"
          />
          {(!hasGrowthObjective && looseLinks.length > 0) && (
            <Button
              version="text"
              onClick={toggleSelect}
              className="h-auto text-xs mr-auto mb-8"
            >
              Choose from your existing links
            </Button>
          )}
        </>
      )}
    </>
  )
}

ObjectiveSettingsChangeAlertDefaultLink.propTypes = {
  shouldSave: PropTypes.bool.isRequired,
  setShouldSave: PropTypes.func.isRequired,
  setIsDisabled: PropTypes.func.isRequired,
  objective: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  setForceSave: PropTypes.func.isRequired,
}

ObjectiveSettingsChangeAlertDefaultLink.defaultProps = {
}

export default ObjectiveSettingsChangeAlertDefaultLink

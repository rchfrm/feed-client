import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useControlsStore from '@/app/stores/controlsStore'
import useSaveLinkToLinkBank from '@/app/hooks/useSaveLinkToLinkBank'
import useSaveIntegrationLink from '@/app/hooks/useSaveIntegrationLink'

import DefaultLinkForm from '@/app/DefaultLinkForm'

import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'

import { getLinkById, getLinkByPlatform, getLinkByHref } from '@/app/helpers/linksHelpers'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
})

const ObjectiveSettingsChangeAlertDefaultLink = ({
  shouldSave,
  setShouldSave,
  setHasError,
  setIsDisabled,
  objective,
  platform,
  setSavedLink,
  setForceSave,
}) => {
  const hasGrowthObjective = objective === 'growth'

  const {
    nestedLinks,
  } = useControlsStore(getControlsStoreState)

  const saveIntegrationLink = useSaveIntegrationLink()
  const saveLinkToLinkBank = useSaveLinkToLinkBank()

  const [link, setLink] = React.useState({})
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const isFacebookOrInstagram = platform === 'facebook' || platform === 'instagram'

  const updateLink = (linkId, link) => {
    if (link) {
      setLink(link)
      return
    }
    setLink(getLinkById(nestedLinks, linkId))
  }

  const saveLink = async () => {
    // Otherwise save the data in the db
    let action = 'add'
    setIsLoading(true)

    // Check if the link already exists in the linkbank
    const existingLink = getLinkByHref(nestedLinks, link.href)
    const currentLink = existingLink || link

    // Edit the link if the link already exists in the linkbank and it's not an integration link
    if (currentLink.id && ! hasGrowthObjective) {
      action = 'edit'
    }

    if (hasGrowthObjective && ! isFacebookOrInstagram) {
      // Save the link in the linkbank as integration link
      return saveIntegrationLink({ platform }, currentLink.href)
    }

    // Save the link in the linkbank or edit the linkbank link based on the action parameter
    return saveLinkToLinkBank(currentLink, action)
  }

  useAsyncEffect(async () => {
    if (shouldSave) {
      const { savedLink, error } = await saveLink()

      setSavedLink(savedLink)

      if (error) {
        setError(error)
        setIsLoading(false)
        setHasError(true)
      }

      setShouldSave(false)
    }
  }, [shouldSave, setShouldSave])

  React.useEffect(() => {
    const integrationLink = getLinkByPlatform(nestedLinks, platform)

    if (hasGrowthObjective && Boolean(integrationLink?.accountId)) {
      setSavedLink(integrationLink)
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
      <MarkdownText markdown={copy.alertLinkDescription(objective, platform)} className="text-grey-dark italic" />
      <Error error={error} />
      <DefaultLinkForm
        link={link}
        setLink={setLink}
        updateLink={updateLink}
        objective={objective}
        platform={platform}
        error={error}
        setError={setError}
        setIsDisabled={setIsDisabled}
        isLoading={isLoading}
      />
    </>
  )
}

ObjectiveSettingsChangeAlertDefaultLink.propTypes = {
  shouldSave: PropTypes.bool,
  setShouldSave: PropTypes.func,
  setHasError: PropTypes.func,
  setIsDisabled: PropTypes.func,
  objective: PropTypes.string,
  platform: PropTypes.string,
  setSavedLink: PropTypes.func,
  setForceSave: PropTypes.func,
}

ObjectiveSettingsChangeAlertDefaultLink.defaultProps = {
  shouldSave: false,
  setShouldSave: () => {},
  setHasError: () => {},
  setIsDisabled: () => {},
  objective: '',
  platform: '',
  setSavedLink: () => {},
  setForceSave: () => {},

}

export default ObjectiveSettingsChangeAlertDefaultLink

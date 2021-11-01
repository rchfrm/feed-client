import React from 'react'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { updateDefaultConversionsLink } from '@/app/helpers/conversionsHelpers'
import { defaultPostLinkId } from '@/app/helpers/linksHelpers'

import PostLinksSelect from '@/app/PostLinksSelect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  defaultLinkId: state.conversionsPreferences.defaultLinkId,
  updatePreferences: state.updatePreferences,
})

const ConversionsWizardLinkStep = () => {
  const { defaultLinkId, updatePreferences } = useControlsStore(getControlsStoreState)
  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)
  const [link, setLink] = React.useState(defaultLinkId || defaultPostLinkId)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const saveDefaultLink = () => {
    return updateDefaultConversionsLink(artistId, link)
  }

  // Handle API request and navigate to the next step
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { res: artist, error } = await saveDefaultLink()
    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    // Update global store value
    updatePreferences(
      'conversionsPreferences',
      { defaultLinkId: artist.preferences.conversions.default_link_id },
    )
    next()
  }

  return (
    <>
      <MarkdownText markdown={copy.linkStepDescription} />
      <Error error={error} />
      <form onSubmit={onSubmit}>
        {/* Select element */}
        <PostLinksSelect
          currentLinkId={link}
          updateParentLink={setLink}
          shouldSaveOnChange={false}
          includeDefaultLink
          includeAddLinkOption
          componentLocation="post"
        />
        <Button
          type="submit"
          version="outline-green icon"
          loading={isLoading}
          spinnerFill={brandColors.black}
          className="w-full"
          trackComponentName="ConversionsWizardLinkStep"
        >
          Continue
          <ArrowAltIcon
            className="ml-3"
            direction="right"
          />
        </Button>
      </form>
    </>
  )
}

export default ConversionsWizardLinkStep

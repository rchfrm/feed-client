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

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const ConversionsWizardLinkStep = () => {
  const { next } = React.useContext(WizardContext)
  const { artist } = React.useContext(ArtistContext)
  const [link, setLink] = React.useState(artist.preferences.conversions.default_link_id || defaultPostLinkId)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const saveDefaultLink = () => {
    return updateDefaultConversionsLink(artist.id, link)
  }

  // Handle API request and navigate to the next step
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { res, error } = await saveDefaultLink()
    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    next()
  }

  return (
    <>
      <h2>Default Link</h2>
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
          version="outline icon"
          loading={isLoading}
          spinnerFill={brandColors.black}
          className="w-full"
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
import React from 'react'

import Button from '@/elements/Button'

import { updateDefaultConversionsLink } from '@/app/helpers/conversionsHelpers'
import { defaultPostLinkId } from '@/app/helpers/linksHelpers'

import PostLinksSelect from '@/app/PostLinksSelect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'


const ConversionsWizardLinkStep = () => {
  const [link, setLink] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)
  const { artist } = React.useContext(ArtistContext)

  const saveDefaultLink = () => {
    return updateDefaultConversionsLink(artist.id, link)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await saveDefaultLink()
    setIsLoading(false)
    next()
  }

  return (
    <>
      <h2>Default Link</h2>
      <p>Some text about default link will be placed here</p>
      <form onSubmit={onSubmit}>
        <PostLinksSelect
          currentLinkId={artist.preferences.conversions.default_link_id || defaultPostLinkId}
          updateParentLink={setLink}
          shouldSaveOnChange={false}
          includeDefaultLink
          includeAddLinkOption
          componentLocation="post"
        />
        <Button
          type="submit"
          version="green icon"
          loading={isLoading}
          className="w-full"
        >
          Continue
          <ArrowAltIcon
            className="ml-3"
            fill={brandColors.white}
            direction="right"
          />
        </Button>
      </form>
    </>
  )
}

export default ConversionsWizardLinkStep

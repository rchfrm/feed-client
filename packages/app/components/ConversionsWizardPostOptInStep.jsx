import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import useAsyncEffect from 'use-async-effect'

import * as ROUTES from '@/app/constants/routes'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { toggleConversionsEnabled } from '@/app/helpers/conversionsHelpers'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'


const getControlsStoreState = (state) => ({
  conversionsPreferences: state.conversionsPreferences,
  setConversionsEnabled: state.setConversionsEnabled,
})

const ConversionsWizardOptInStep = ({ setIsWizardActive }) => {
  const { artistId } = React.useContext(ArtistContext)
  const { conversionsPreferences, setConversionsEnabled } = useControlsStore(getControlsStoreState)
  const hasSetUpConversions = Object.values(conversionsPreferences).every(Boolean)

  // Run on initial mount
  useAsyncEffect(async (isMounted) => {
    if (!isMounted) return
    // Set conversions toggle to true if conversions is set up correctly
    if (hasSetUpConversions) {
      const { res: artist, error } = await toggleConversionsEnabled(artistId, true)
      if (error) {
        return
      }
      setConversionsEnabled(artist.conversions_enabled)
    }
  }, [hasSetUpConversions])

  // Navigate to the posts page
  const goToPostsPage = async () => {
    Router.push({
      pathname: ROUTES.HOME,
      query: { postStatus: 'not-run' },
    })
  }

  React.useEffect(() => {
    return () => setIsWizardActive(false)
  }, [setIsWizardActive])

  return (
    <>
      <MarkdownText markdown={copy.postOptInStepDescription} />
      <Button
        version="green icon"
        onClick={goToPostsPage}
        className="w-full"
      >
        Opt in posts
        <ArrowAltIcon
          className="ml-3"
          fill={brandColors.white}
          direction="right"
        />
      </Button>
    </>
  )
}

ConversionsWizardOptInStep.propTypes = {
  setIsWizardActive: PropTypes.func.isRequired,
}

export default ConversionsWizardOptInStep

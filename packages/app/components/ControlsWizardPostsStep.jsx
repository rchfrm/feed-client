import React from 'react'
// import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import useControlsStore from '@/app/stores/controlsStore'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import CloseCircle from '@/icons/CloseCircle'
import TickCircleIcon from '@/icons/TickCircleIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

import * as server from '@/app/helpers/appServer'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
  postsPreferences: state.postsPreferences,
})

const ControlsWizardPostsStep = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistId, setPostPreferences } = React.useContext(ArtistContext)
  const { next } = React.useContext(WizardContext)
  const { updatePreferences, postsPreferences } = useControlsStore(getControlsStoreState)
  const { defaultPromotionEnabled } = postsPreferences
  const [isEnabled, setIsEnabled] = React.useState(false)

  // Call the server with the new post status
  const savePromotableDefaultStatus = React.useCallback(async (isDefaultPromotionEnabled) => {
    // Skip doing API request if the new value is equal to the current value
    if (isDefaultPromotionEnabled === defaultPromotionEnabled) {
      next()
      return
    }
    setIsEnabled(isDefaultPromotionEnabled)
    setIsLoading(true)
    // Batch toggle all posts on server
    const { success } = await server.toggleDefaultPromotionStatus(artistId, isDefaultPromotionEnabled)
    if (!success) return
    // Patch artist post preferences
    const { preferences: { posts: { promotion_enabled_default } } } = await server.patchArtistPromotionStatus(artistId, isDefaultPromotionEnabled)
    setIsLoading(false)
    // Update artist context status
    setPostPreferences('promotion_enabled_default', promotion_enabled_default)
    // Update posts preferences in controls store
    updatePreferences('postsPreferences', { defaultPromotionEnabled: promotion_enabled_default })
    next()
  }, [artistId, next, setPostPreferences, updatePreferences, defaultPromotionEnabled])

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardPostsStepIntro} />
      <div className="flex w-1/2 ml-auto mb-10">
        <Button
          version="outline-black small"
          onClick={() => savePromotableDefaultStatus(false)}
          className="w-full mr-6 border-black"
          spinnerFill={brandColors.black}
          loading={isLoading && !isEnabled}
          trackComponentName="ControlsWizardPostsStep"
        >
          <CloseCircle
            fill={brandColors.red}
            className="w-6 h-6 mr-2"
          />
          No
        </Button>
        <Button
          version="outline-black small"
          onClick={() => savePromotableDefaultStatus(true)}
          className="w-full border-black"
          spinnerFill={brandColors.black}
          loading={isLoading && isEnabled}
          trackComponentName="ControlsWizardPostsStep"
        >
          <TickCircleIcon
            className="w-6 h-6 mr-2"
          />
          Yes
        </Button>
      </div>
    </>
  )
}

ControlsWizardPostsStep.propTypes = {
}

export default ControlsWizardPostsStep

import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import PostCardDisableHandler from '@/app/PostCardDisableHandler'
import PostCardToggleAlert from '@/app/PostCardToggleAlert'

import ToggleSwitch from '@/elements/ToggleSwitch'

import { updatePost } from '@/app/helpers/postsHelpers'

const PostCardSettingsToggle = ({
  post,
  postId,
  postToggleSetterType,
  campaignType,
  toggleCampaign,
  artistId,
  isEnabled,
  setIsEnabled,
  isDisabled,
  showAlertModal,
}) => {
  const { postPromotable, promotionStatus } = post
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasChanged, setHasChanged] = React.useState(false)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const isConversionsCampaign = campaignType === 'conversions'

  const onChange = React.useCallback(async (newState) => {
    if (showAlertModal) {
      setShouldShowAlert(true)
      return
    }
    // Start loading
    setIsLoading(true)
    setHasChanged(true)
    // Update state passed to toggle component
    setIsEnabled(newState)
    const { res: updatedPost, error } = await updatePost({ artistId, postId, promotionEnabled: newState, campaignType })
    setIsLoading(false)
    // Return to previous value if erroring
    if (error) {
      setIsEnabled(!newState)
      return
    }
    // Update post list state
    const { promotion_enabled, conversions_enabled, promotable_status } = updatedPost
    toggleCampaign(postId, isConversionsCampaign ? conversions_enabled : promotion_enabled, promotable_status, campaignType)
  }, [artistId, postId, toggleCampaign, campaignType, setIsEnabled, isConversionsCampaign, showAlertModal])

  const goToControlsPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS,
    })
  }

  React.useEffect(() => {
    setHasChanged(false)
  }, [campaignType])

  return (
    <div className="flex flex-column w-1/2">
      <h3 className="font-bold text-lg">Promotion</h3>
      <div
        className={[
          'flex items-center',
          'mb-10',
          showAlertModal ? 'border-2 border-solid border-red' : null,
        ].join(' ')}
      >
        <ToggleSwitch
          state={isEnabled}
          onChange={onChange}
          isLoading={isLoading}
          className="mr-4"
          disabled={isDisabled}
        />
        <p className="font-bold mb-0">{isEnabled ? 'Enabled' : 'Disabled'}</p>
        {postPromotable && promotionStatus === 'active' && hasChanged && (
          <PostCardDisableHandler
            post={post}
            postToggleSetterType={postToggleSetterType}
            artistId={artistId}
            toggleCampaign={toggleCampaign}
            isEnabled={isEnabled}
            setIsEnabled={setIsEnabled}
            campaignType={campaignType}
          />
        )}
        {/* TOGGLE ALERT */}
        {shouldShowAlert && (
          <PostCardToggleAlert
            show={shouldShowAlert}
            onAlertConfirm={goToControlsPage}
            onCancel={() => {
              setShouldShowAlert(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

PostCardSettingsToggle.propTypes = {
  post: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  campaignType: PropTypes.string.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  artistId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  setIsEnabled: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  showAlertModal: PropTypes.bool,
}

PostCardSettingsToggle.defaultProps = {
  showAlertModal: false,
}

export default PostCardSettingsToggle

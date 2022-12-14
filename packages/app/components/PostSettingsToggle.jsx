import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import PostDisableHandler from '@/app/PostDisableHandler'
import PostToggleAlert from '@/app/PostToggleAlert'
import ToggleSwitch from '@/elements/ToggleSwitch'
import * as ROUTES from '@/app/constants/routes'
import { updatePost as update } from '@/app/helpers/postsHelpers'

const PostSettingsToggle = ({
  post,
  postId,
  campaignType,
  updatePost,
  artistId,
  isEnabled,
  setIsEnabled,
  isDisabled,
  showAlertModal,
  className,
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
    setIsLoading(true)
    setHasChanged(true)
    setIsEnabled(newState)

    const { res: updatedPost, error } = await update({ artistId, postId, promotionEnabled: newState, campaignType })

    if (error) {
      setIsEnabled(! newState)
      setIsLoading(false)
      return
    }

    const { promotion_enabled, conversions_enabled, promotable_status } = updatedPost
    updatePost({
      type: isConversionsCampaign ? 'toggle-conversion' : 'toggle-promotion',
      payload: {
        promotionEnabled: isConversionsCampaign ? conversions_enabled : promotion_enabled,
        promotableStatus: promotable_status,
      },
    })
    setIsLoading(false)
  }, [artistId, postId, updatePost, campaignType, setIsEnabled, isConversionsCampaign, showAlertModal])

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
      <h3 className={[
        isDisabled ? 'text-grey-2' : null,
        'font-bold text-lg',
      ].join(' ')}
      >
        Promotion
      </h3>
      <div
        className={[
          'flex items-center',
          'mb-10',
          className,
        ].join(' ')}
      >
        <ToggleSwitch
          state={isEnabled}
          onChange={onChange}
          isLoading={isLoading}
          className="mr-4"
          disabled={isDisabled}
        />
        <p
          className={[
            'mb-0',
            showAlertModal ? 'text-red' : null,
            isDisabled ? 'text-grey-2' : null,
          ].join(' ')}
        >
          {isEnabled ? 'Enabled' : 'Disabled'}
        </p>
        {postPromotable && promotionStatus === 'active' && hasChanged && (
          <PostDisableHandler
            post={post}
            artistId={artistId}
            updatePost={updatePost}
            isEnabled={isEnabled}
            setIsEnabled={setIsEnabled}
            campaignType={campaignType}
          />
        )}
        {shouldShowAlert && (
          <PostToggleAlert
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

PostSettingsToggle.propTypes = {
  post: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  campaignType: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  artistId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  setIsEnabled: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  showAlertModal: PropTypes.bool,
  className: PropTypes.string,
}

PostSettingsToggle.defaultProps = {
  showAlertModal: false,
  className: null,
}

export default PostSettingsToggle

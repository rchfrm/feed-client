import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import CallToActionSelector from '@/app/CallToActionSelector'

import CheckboxInput from '@/elements/CheckboxInput'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import { getPostCallToActions, setPostCallToAction } from '@/app/helpers/postsHelpers'
import { capitalise } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  conversionsPreferences: state.conversionsPreferences,
  optimizationPreferences: state.optimizationPreferences,
})

const PostSettingsCallToAction = ({
  post,
  campaignType,
}) => {
  const {
    id: postId,
    promotionStatus,
  } = post

  const [callToActions, setCallToActions] = React.useState([])
  const [savedCallToAction, setSavedCallToAction] = React.useState('')
  const [currentCallToAction, setCurrentCallToAction] = React.useState('')
  const [currentCallToActionId, setCurrentCallToActionId] = React.useState('')

  const [isDefaultCallToAction, setIsDefaultCallToAction] = React.useState(true)
  const [shouldShowSaveButton, setShouldShowSaveButton] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  // Get global default call to actions for both campaign types from store
  const { postsPreferences, conversionsPreferences, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { callToAction: defaultPostsCallToAction } = postsPreferences
  const { callToAction: defaultConversionsCallToAction } = conversionsPreferences
  const defaultCallToAction = campaignType === 'all' ? defaultPostsCallToAction : defaultConversionsCallToAction || defaultPostsCallToAction
  const defaultCallToActionString = capitalise(defaultCallToAction.toLowerCase().split('_').join(' '))

  const isPostActive = promotionStatus === 'active'

  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  // Get post level call to actions
  useAsyncEffect(async (isMounted) => {
    const { res, error } = await getPostCallToActions(artistId, postId)
    if (!isMounted) return

    if (error) {
      return
    }

    setCallToActions(res)
  }, [])

  const handleChange = () => {
    setIsDefaultCallToAction(!isDefaultCallToAction)

    if (!isDefaultCallToAction) {
      setCurrentCallToAction(defaultCallToAction)
    }
  }

  // Save currently selected call to action and hide save button
  const save = async () => {
    const { res: postCallToAction, error } = await setPostCallToAction({
      artistId,
      callToAction: currentCallToAction,
      hasSalesObjective,
      assetId: postId,
      campaignType,
      callToActionId: currentCallToActionId,
    })

    if (error) {
      setError(error)
      return
    }

    setSavedCallToAction(postCallToAction.value)
    setShouldShowSaveButton(false)

    if (currentCallToAction === defaultCallToAction) {
      setIsDefaultCallToAction(true)
    }
  }

  // Watch for call to action changes and show save button if there has been a change
  React.useEffect(() => {
    const hasChanged = currentCallToAction !== savedCallToAction

    setShouldShowSaveButton(hasChanged)
  }, [currentCallToAction, savedCallToAction])

  // On initial mount and on campaign type change set the call to action
  React.useEffect(() => {
    if (!callToActions.length) return

    const postCallToAction = callToActions?.find((callToAction) => callToAction.campaignType === campaignType) || {}
    // Initial value is post level call to action, or default call to action
    const callToAction = postCallToAction?.value || defaultCallToAction || ''

    setCurrentCallToAction(callToAction)
    setCurrentCallToActionId(postCallToAction?.id || '')
    setSavedCallToAction(callToAction)

    if (postCallToAction?.value && postCallToAction?.value !== defaultCallToAction) {
      setIsDefaultCallToAction(false)
    }
    setIsLoading(false)
  }, [campaignType, callToActions, defaultCallToAction])

  if (isLoading) return <Spinner className="h-64 flex items-center" width={28} />

  return (
    <>
      <div className="flex justify-between">
        <p className="text-lg font-bold">Call to action</p>
        {shouldShowSaveButton && (
          <Button
            version="green small"
            className={[
              'h-8',
              'rounded-full',
            ].join(' ')}
            onClick={save}
            trackComponentName="PostSettings"
          >
            Save
          </Button>
        )}
      </div>
      <CheckboxInput
        buttonLabel={`Use default (${defaultCallToActionString})`}
        value="cta"
        checked={isDefaultCallToAction}
        onChange={handleChange}
      />
      {!isDefaultCallToAction && (
        <CallToActionSelector
          callToAction={currentCallToAction}
          setCallToAction={setCurrentCallToAction}
          callToActionId={currentCallToActionId}
          postId={postId}
          isPostActive={isPostActive}
          campaignType={campaignType}
          disabled={false}
        />
      )}
      <Error error={error} />
    </>
  )
}

PostSettingsCallToAction.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
}

PostSettingsCallToAction.defaultProps = {
}

export default PostSettingsCallToAction

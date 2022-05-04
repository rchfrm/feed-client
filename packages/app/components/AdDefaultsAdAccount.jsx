import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useCheckBackgroundTaskStatus from '@/app/hooks/useCheckBackgroundTaskStatus'

import AdAccountSelector from '@/app/AdAccountSelector'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'

import Spinner from '@/elements/Spinner'

import { getArtistIntegrationByPlatform, getBackgroundTasks } from '@/app/helpers/artistHelpers'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const AdDefaultsAdAccount = ({
  hasCompletedAdAccountChange,
  setHasCompletedAdAccountChange,
  className,
}) => {
  const { artistId, artist } = React.useContext(ArtistContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')

  const [adAccountId, setAdAccountId] = React.useState(facebookIntegration?.adaccount_id || '')

  const { initialLoading } = useCheckBackgroundTaskStatus({
    artistId,
    action: getBackgroundTasks,
    hasCompleted: hasCompletedAdAccountChange,
    setHasCompleted: setHasCompletedAdAccountChange,
  })

  return (
    <div
      className={[
        'block relative',
        className,
      ].join(' ')}
    >
      <AdAccountSelector
        adAccountId={adAccountId}
        setAdAccountId={setAdAccountId}
        setHasCompletedAdAccountChange={setHasCompletedAdAccountChange}
        shouldSaveOnChange
        className="mb-14"
      />
      <ControlsSettingsSectionFooter
        icon="email"
        color={brandColors.green}
        copy={copy.facebookAdAccountFooter}
        className="text-green"
      />
    </div>
  )
}

AdDefaultsAdAccount.propTypes = {
  hasCompletedAdAccountChange: PropTypes.bool.isRequired,
  setHasCompletedAdAccountChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AdDefaultsAdAccount.defaultProps = {
  className: null,
}

export default AdDefaultsAdAccount

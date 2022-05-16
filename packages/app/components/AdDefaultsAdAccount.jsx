import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useCheckBackgroundTaskStatus from '@/app/hooks/useCheckBackgroundTaskStatus'

import AdAccountSelector from '@/app/AdAccountSelector'

import { getArtistIntegrationByPlatform, getBackgroundTasks } from '@/app/helpers/artistHelpers'

const AdDefaultsAdAccount = ({
  className,
}) => {
  const { artistId, artist } = React.useContext(ArtistContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')

  const [adAccountId, setAdAccountId] = React.useState(facebookIntegration?.adaccount_id || '')
  const [hasCompletedAdAccountChange, setHasCompletedAdAccountChange] = React.useState(true)

  useCheckBackgroundTaskStatus({
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
        hasCompletedAdAccountChange={hasCompletedAdAccountChange}
        setHasCompletedAdAccountChange={setHasCompletedAdAccountChange}
        shouldSaveOnChange
      />
    </div>
  )
}

AdDefaultsAdAccount.propTypes = {
  className: PropTypes.string,
}

AdDefaultsAdAccount.defaultProps = {
  className: null,
}

export default AdDefaultsAdAccount

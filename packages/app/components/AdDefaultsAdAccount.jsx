import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import AdAccountSelector from '@/app/AdAccountSelector'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'

const AdDefaultsAdAccount = ({ className }) => {
  const { artist } = React.useContext(ArtistContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')

  const [adAccountId, setAdAccountId] = React.useState(facebookIntegration?.adaccount_id || '')

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

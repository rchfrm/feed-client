import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import AdAccountSelector from '@/app/AdAccountSelector'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

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
        className="mb-14"
        disabled
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
  className: PropTypes.string,
}

AdDefaultsAdAccount.defaultProps = {
  className: null,
}

export default AdDefaultsAdAccount

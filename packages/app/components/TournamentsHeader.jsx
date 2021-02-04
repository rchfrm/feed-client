import React from 'react'
import PropTypes from 'prop-types'

import { getAudiencePropFromSlug, getFunnelPropFromId } from '@/app/helpers/funnelHelpers'

const getValues = ({ audienceSlug, adTypeId }) => {
  return {
    audienceColor: getAudiencePropFromSlug(audienceSlug, 'color'),
    audienceTitle: getAudiencePropFromSlug(audienceSlug, 'title'),
    adTypeTitle: getFunnelPropFromId(adTypeId, 'title'),
  }
}

const TournamentsHeader = ({
  audienceSlug,
  adTypeId,
  className,
}) => {
  const values = getValues({ audienceSlug, adTypeId })
  return (
    <header
      className={[
        'inline-flex items-baseline mt-1 mb-5 bg-grey-1 rounded-dialogue px-4 py-3',
        className,
      ].join(' ')}
    >
      <h2 className="font-body font-normal text-xl mb-0">ad type: <strong className="capitalize">{values.adTypeTitle}</strong></h2>
      <div className="mx-5">
        <div className="rounded-full w-3 h-3" style={{ backgroundColor: values.audienceColor }} />
      </div>
      <h3 className="font-body font-normal text-xl mb-0">audience: <strong className="capitalize">{values.audienceTitle}</strong></h3>
    </header>
  )
}

TournamentsHeader.propTypes = {
  audienceSlug: PropTypes.string.isRequired,
  adTypeId: PropTypes.string.isRequired,
  className: PropTypes.string,
}

TournamentsHeader.defaultProps = {
  className: null,
}

export default React.memo(TournamentsHeader)

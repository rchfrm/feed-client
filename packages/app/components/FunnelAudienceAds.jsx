import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import FunnelAudienceAd from '@/app/FunnelAudienceAd'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/funnelCopy'

const FunnelAudienceAds = ({
  audienceSlug,
  audienceAds,
  tournamentStatus,
  activeFunnelId,
  className,
}) => {
  const { artist: { feedMinBudgetInfo } } = React.useContext(ArtistContext)
  // NO ADS or no active ads
  if (!audienceAds.length || tournamentStatus !== 'active') {
    const { string: { minReccomendedBase, minReccomendedStories } } = feedMinBudgetInfo
    const minBudget = activeFunnelId === 'stories' ? minReccomendedStories : minReccomendedBase
    return (
      <div className="bg-grey-1 p-5 rounded-dialogue mb-8">
        <MarkdownText className="mb-0" markdown={copy[audienceSlug].noAds[activeFunnelId](minBudget)} />
      </div>
    )
  }

  const isSingleAd = audienceAds.length === 1
  // Get scores into array
  const adScores = audienceAds.map(({ engagement_score = 0 }) => {
    return engagement_score
  })

  return (
    <div
      className={[
        className,
        isSingleAd ? 'justify-center' : 'justify-between',
      ].join(' ')}
    >
      {isSingleAd ? (
        // SINGLE AD
        <FunnelAudienceAd
          adData={audienceAds[0]}
          score={adScores[0]}
          winner
          isSingleAd
        />
      ) : (
        // DOUBLE AD
        <>
          <FunnelAudienceAd
            adData={audienceAds[0]}
            score={adScores[0]}
            winner={adScores[0] > adScores[1]}
            className={[
              'mt-2',
            ].join(' ')}
          />
          <p className="mb-0 font-bold font-italic">
            vs
          </p>
          <FunnelAudienceAd
            adData={audienceAds[1]}
            score={adScores[1]}
            winner={adScores[1] > adScores[0]}
            className={[
              // 'flex flex-grow justify-center',
            ].join(' ')}
          />
        </>
      )}
    </div>
  )
}

FunnelAudienceAds.propTypes = {
  audienceSlug: PropTypes.string.isRequired,
  audienceAds: PropTypes.array.isRequired,
  tournamentStatus: PropTypes.string.isRequired,
  activeFunnelId: PropTypes.string.isRequired,
  className: PropTypes.string,
}

FunnelAudienceAds.defaultProps = {
  className: null,
}



export default FunnelAudienceAds

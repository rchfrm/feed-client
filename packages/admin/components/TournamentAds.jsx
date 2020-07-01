import React from 'react'
import PropTypes from 'prop-types'

import TournamentAd from '@/admin/TournamentAd'

const TournamentAds = ({ ads, winningAdId }) => {
  return (
    <section className="pt-5 col-span-12">
      <h4 className="h3 mb-2"><strong>The ads</strong></h4>
      <div style={{ height: 2 }} className="w-full bg-green mb-8" />
      <div className="grid grid-cols-12 col-span-12 gap-8">
        {ads.map((ad) => {
          const winner = ad.id === winningAdId
          return <TournamentAd key={ad.id} ad={ad} winner={winner} className="col-span-12 md:col-span-6" />
        })}
      </div>
    </section>
  )
}

TournamentAds.propTypes = {
  ads: PropTypes.array.isRequired,
  winningAdId: PropTypes.string,
}

TournamentAds.defaultProps = {
  winningAdId: '',
}


export default TournamentAds

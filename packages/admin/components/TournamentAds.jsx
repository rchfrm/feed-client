import React from 'react'
import PropTypes from 'prop-types'

import SectionHeader from '@/admin/elements/SectionHeader'
import TournamentAd from '@/admin/TournamentAd'

const TournamentAds = ({ ads, winningAdId }) => {
  return (
    <section className="pt-5 col-span-12">
      <SectionHeader header="The ads" />
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

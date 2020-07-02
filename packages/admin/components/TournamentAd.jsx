import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import Error from '@/elements/Error'
import TournamentAdCreative from '@/admin/TournamentAdCreative'
import DataDetails from '@/admin/elements/DataDetails'

import * as api from '@/helpers/api'
import { UserContext } from '@/contexts/UserContext'

const fetcher = (path, token) => {
  return api.get(`/${path}`, token)
}

const TournamentAd = ({ ad, winner, className }) => {
  const propsToDisplay = [
    'name',
    'platform',
    'engagement_score',
    'spend_adjusted_engagement_score',
  ]

  const { user } = React.useContext(UserContext)
  const { data: adData, error } = useSWR(
    user ? [ad.ad.path, user.token] : null,
    fetcher,
  )

  if (!adData) return null
  if (error) return <Error error={error} />

  console.log('adData', adData)

  return (
    <div className={className}>
      <h4 className="h3"><strong>Ad: {ad.id}</strong></h4>
      {winner && <h5 className="text-green">☆ WINNER ☆</h5>}
      <DataDetails propsToDisplay={propsToDisplay} data={adData} />
      {Object.values(adData.adcreatives).map((adCreative) => {
        return <TournamentAdCreative key={adCreative.id} adCreative={adCreative} />
      })}
      <hr className="md:hidden" />
    </div>
  )
}

TournamentAd.propTypes = {
  ad: PropTypes.object.isRequired,
  winner: PropTypes.bool,
  className: PropTypes.string,
}

TournamentAd.defaultProps = {
  winner: false,
  className: '',
}

export default TournamentAd

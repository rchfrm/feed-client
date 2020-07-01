import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import Error from '@/elements/Error'
import TournamentAdCreative from '@/admin/TournamentAdCreative'
import DataDetails from '@/admin/elements/DataDetails'

import * as api from '@/helpers/api'
import { UserContext } from '@/contexts/UserContext'

const propsToDisplay = [
  'name',
  'engagement_score',
  'spend_adjusted_engagement_score',
]

const fetcher = (path, token) => {
  return api.get(`/${path}`, token)
}

const TournamentAd = ({ ad, winner, className }) => {
  const { user } = React.useContext(UserContext)
  const { data, error } = useSWR(
    user ? [ad.ad.path, user.token] : null,
    fetcher,
  )

  if (error) return <Error error={error} />

  if (!data) return null

  return (
    <div className={className}>
      {winner && <h5 className="mb-2 text-green">☆ WINNER ☆</h5>}
      <h4 className="h3"><strong>Ad: {ad.id}</strong></h4>
      <DataDetails propsToDisplay={propsToDisplay} data={data} />
      {Object.values(data.adcreatives).map((adCreative) => {
        return <TournamentAdCreative key={adCreative.id} adCreative={adCreative} />
      })}
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

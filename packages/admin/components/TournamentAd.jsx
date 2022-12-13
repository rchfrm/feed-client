import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import Error from '@/elements/Error'
import TournamentAdCreative from '@/admin/TournamentAdCreative'
import DataDetails from '@/admin/elements/DataDetails'

import * as api from '@/helpers/api'
import { UserContext } from '@/admin/contexts/UserContext'

const fetcher = (path) => {
  return api.get(`/${path}`)
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

  if (! adData) return null
  if (error) return <Error error={error} />

  return (
    <div className={[className].join(' ')}>
      <h4 className="h3">
        {winner && <span className="text-green">☆ </span>}
        <strong>Ad: {ad.id}</strong>
        {winner && <span className="inline-block pl-4 text-green small--p">[winner]</span>}
      </h4>
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

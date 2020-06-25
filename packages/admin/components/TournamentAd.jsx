import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import TournamentAdCreative from '@/admin/TournamentAdCreative'
import DataDetails from '@/admin/elements/DataDetails'

import * as api from '@/helpers/api'
import { useUser } from '@/admin/hooks/useUser'

const propsToDisplay = [
  'name',
  'engagement_score',
  'spend_adjusted_engagement_score',
]

const fetcher = (path, token) => {
  return api.get(`/${path}`, token)
}

const TournamentAd = ({ ad, winner }) => {
  const { user } = useUser()
  const { data, error } = useSWR(
    user ? [ad.ad.path, user.token] : null,
    fetcher,
  )

  const header = winner ? `Ad (${ad.id}) ***WINNER***` : `Ad (${ad.id})`

  if (!data) return null
  return (
    <>
      <DataDetails propsToDisplay={propsToDisplay} data={data} header={header} />
      {Object.values(data.adcreatives).map((adCreative) => {
        return <TournamentAdCreative key={adCreative.id} adCreative={adCreative} />
      })}
    </>
  )
}

TournamentAd.propTypes = {
  ad: PropTypes.object.isRequired,
  winner: PropTypes.bool,
}

TournamentAd.defaultProps = {
  winner: false,
}

export default TournamentAd

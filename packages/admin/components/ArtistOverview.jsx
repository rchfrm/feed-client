import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import DataDetails from '@/admin/elements/DataDetails'
import CopyTextButton from '@/elements/CopyTextButton'

import * as ROUTES from '@/admin/constants/routes'

const propsToDisplay = [
  'name',
  'created_at',
  'currency',
  'country_code',
  'daily_budget',
  'status',
]

const getUsersData = (users) => {
  return Object.values(users).map(({ id, name, role }) => {
    return { id, name, role }
  })
}

const ArtistOverview = ({ artist }) => {
  console.log('artist', artist)

  const artistUsers = React.useMemo(() => {
    return getUsersData(artist.users)
  }, [artist])

  return (
    <div>
      <DataDetails propsToDisplay={propsToDisplay} data={artist} border />
      {/* Users */}
      <p>
        <span>Users: </span>
      </p>
      <ul>
        {artistUsers.map(({ name, id, role }, index) => {
          return (
            <li key={id}>
              <strong>
                {name} ({role})
                {index !== artistUsers.length - 1 ? ', ' : ''}
              </strong>
              {' '}
              <div className="mt-3">
                <CopyTextButton text={id} />
              </div>
            </li>
          )
        })}
      </ul>
      {/* Tournaments link */}
      <p>
        <Link href={{ pathname: ROUTES.TOURNAMENTS, query: { artistId: artist.id } }}>
          <a>Tournaments</a>
        </Link>
      </p>
    </div>
  )
}

ArtistOverview.propTypes = {
  artist: PropTypes.object.isRequired,
}

export default ArtistOverview

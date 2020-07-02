import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import Button from '@/elements/Button'

import DataDetails from '@/admin/elements/DataDetails'
import DataDetail from '@/admin/elements/DataDetail'
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
  // console.log('artist', artist)
  const artistUsers = React.useMemo(() => {
    return getUsersData(artist.users)
  }, [artist])

  return (
    <div>
      <DataDetails propsToDisplay={propsToDisplay} data={artist} border />
      <DataDetail name="Artist ID" value={artist.id} copy />
      {/* Users */}
      <p>
        <span>Users: </span>
      </p>
      <ul className="list-disc pl-5">
        {artistUsers.map(({ name, id, role }, index) => {
          return (
            <li className="pl-3" key={id}>
              <p>
                <strong>
                  {name} ({role})
                  {index !== artistUsers.length - 1 ? ', ' : ''}
                </strong>
              </p>
              <div className="mt-3">
                <DataDetail name="User ID" value={id} copy />
              </div>
            </li>
          )
        })}
      </ul>
      {/* Tournaments link */}
      <p>
        <Link href={{ pathname: ROUTES.TOURNAMENTS, query: { artistId: artist.id } }}>
          <Button className="w-40" version="black small" wrapper="a">
            Tournaments
          </Button>
        </Link>
      </p>
    </div>
  )
}

ArtistOverview.propTypes = {
  artist: PropTypes.object.isRequired,
}

export default ArtistOverview

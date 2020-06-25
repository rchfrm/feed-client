import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import DataDetail from '@/admin/elements/DataDetail'
import DataDetails from '@/admin/elements/DataDetails'

import * as ROUTES from '@/constants/routes'

const propsToDisplay = [
  'id',
  'email',
  'role',
  'created_at',
  'updated_at',
]

const UserOverview = ({ user }) => {
  const userName = `${user.first_name} ${user.last_name}`
  const userArtists = Object.values(user.artists)
  const userOrgs = Object.values(user.organizations)
  return (
    <div>
      <DataDetail name="name" value={userName} border />
      <DataDetails propsToDisplay={propsToDisplay} data={user} />
      {/* Artist links */}
      <div>
        <h4>Artists</h4>
        <ul>
          {userArtists.map(({ id, name }) => {
            return (
              <li key={id}>
                <Link href={{ pathname: ROUTES.ARTIST, query: { id } }}>
                  <a>{name} ({id})</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {/* ORG links */}
      <div>
        <h4>Organisations</h4>
        <ul>
          {userOrgs.map(({ id, name, role }) => {
            return (
              <li key={id}>
                {role}
                {': '}
                <Link href={{ pathname: ROUTES.ORGANISATION, query: { id } }}>
                  <a>{name} ({id})</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

UserOverview.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserOverview

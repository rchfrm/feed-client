import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import UserArtists from '@/admin/UserArtists'
import SectionHeader from '@/admin/elements/SectionHeader'
import DataDetail from '@/admin/elements/DataDetail'
import DataDetails from '@/admin/elements/DataDetails'

import * as ROUTES from '@/admin/constants/routes'

const UserOverview = ({ user, propsToDisplay }) => {
  // const userName = `${user.first_name} ${user.last_name}`
  const userArtists = Object.values(user.artists)
  const userOrgs = Object.values(user.organizations)
  return (
    <>
      <SectionHeader header={userName} />
      <DataDetail name="User ID" value={user.id} copyText />
      <DataDetails propsToDisplay={propsToDisplay} data={user} />
      {/* ARTIST LINKS */}
      {userArtists && !!userArtists.length && (
        <UserArtists
          artists={userArtists}
        />
      )}
      {/* ORG links */}
      {userOrgs && !!userOrgs.length && (
        <div>
          <h4><strong>Organisations</strong></h4>
          <ul className="list-disc pl-5">
            {userOrgs.map(({ id, name, role }) => {
              return (
                <li className="mb-4" key={id}>
                  <Link href={{ pathname: ROUTES.ORGANISATION, query: { orgId: id } }}>
                    <a>{name}</a>
                  </Link>
                  {' '}
                  ({role})
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

UserOverview.propTypes = {
  user: PropTypes.object.isRequired,
  propsToDisplay: PropTypes.array.isRequired,
}

export default UserOverview

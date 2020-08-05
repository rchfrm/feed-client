import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'
import DataDetail from '@/admin/elements/DataDetail'

import * as ROUTES from '@/admin/constants/routes'

const ArtistUsers = ({ users }) => {
  const [showUsers, setShowUsers] = React.useState(false)
  const toggleUsers = () => setShowUsers(!showUsers)
  return (
    <div>
      <p>
        <span>Users ({users.length})</span>
        <button className="ml-2 pl-2 text-lg" aria-label="Toggle Users" onClick={toggleUsers}>
          {showUsers ? '↓' : '→'}
        </button>
      </p>
      <ul
        className={[
          'list-disc',
          'pl-5',
          showUsers ? '' : 'hidden',
        ].join(' ')}
      >
        {users.map(({ name, id, role }, index) => {
          return (
            <li className="pl-3" key={id}>
              <p>
                <strong>
                  {name} ({role})
                  {index !== users.length - 1 ? ', ' : ''}
                </strong>
              </p>
              <p>
                <Link
                  href={{
                    pathname: ROUTES.USER,
                    query: { userId: id },
                  }}
                >
                  <a>User Page</a>
                </Link>
              </p>
              <div className="mt-3">
                <DataDetail name="User ID" value={id} copyText />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

ArtistUsers.propTypes = {
  users: PropTypes.array.isRequired,
}

export default ArtistUsers

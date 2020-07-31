import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import DataDetail from '@/admin/elements/DataDetail'

import * as ROUTES from '@/admin/constants/routes'

const UserArtists = ({ artists }) => {
  const initialOpen = artists.length < 3
  const [showArtists, setShowArtists] = React.useState(initialOpen)
  const toggleUsers = () => setShowArtists(!showArtists)
  return (
    <div>
      <p>
        <span>Artists ({artists.length})</span>
        <button className="ml-2 pl-2 text-lg" aria-label="Toggle Users" onClick={toggleUsers}>
          {showArtists ? '↓' : '→'}
        </button>
      </p>
      <ul
        className={[
          'list-disc',
          'pl-5',
          showArtists ? '' : 'hidden',
        ].join(' ')}
      >
        {artists.map(({ name, id, role }) => {
          return (
            <li className="pl-3" key={id}>
              <p>
                <Link href={{ pathname: ROUTES.ARTIST, query: { artistId: id } }}>
                  <a><strong>{name} ({role})</strong></a>
                </Link>
              </p>
              <div className="mt-3">
                <DataDetail name="Artist ID" value={id} copyText />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

UserArtists.propTypes = {
  artists: PropTypes.array.isRequired,
}

export default UserArtists

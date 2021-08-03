import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'
import DataDetail from '@/admin/elements/DataDetail'

import * as ROUTES from '@/admin/constants/routes'

const EntityConnections = ({ connections, connectionType }) => {
  // Hide or show the list of connected entities
  const [showConnections, setShowConnections] = React.useState(false)
  const toggleConnections = () => setShowConnections(!showConnections)
  // Set query parameter based on entity type
  const queryId = connectionType === 'User' ? 'userId' : connectionType === 'Artist' ? 'artistId' : 'orgId'
  // Pluralise connection type if there is more than 1
  const type = connections.length === 1 ? connectionType : `${connectionType}s`

  return (
    <div>
      <p>
        <span>{type} ({connections.length})</span>
        <button className="ml-2 pl-2 text-lg" aria-label="Toggle Users" onClick={toggleConnections}>
          {showConnections ? '↓' : '→'}
        </button>
      </p>
      <ul
        className={[
          'list-disc',
          'pl-5',
          showConnections ? '' : 'hidden',
        ].join(' ')}
      >
        {connections.map(({ id, name }, index) => {
          return (
            <li className="pl-3" key={id}>
              <p>
                <strong>
                  {name}
                  {index !== connections.length - 1 ? ', ' : ''}
                </strong>
              </p>
              <p>
                <Link
                  href={{
                    pathname: ROUTES.USER,
                    query: { [queryId]: id },
                  }}
                >
                  <a>{connectionType} Page</a>
                </Link>
              </p>
              <div className="mt-3">
                <DataDetail name="ID" value={id} copyText />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

EntityConnections.propTypes = {
  connections: PropTypes.array.isRequired,
  connectionType: PropTypes.string.isRequired,
}

export default EntityConnections

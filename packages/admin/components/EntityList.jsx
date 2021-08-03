import React from 'react'
import PropTypes from 'prop-types'

import AdminGrid from '@/admin/elements/AdminGrid'
import AdminGridItem from '@/admin/elements/AdminGridItem'
import EntityOverview from '@/admin/EntityOverview'

const EntityList = ({ entities, propsToDisplay, isSingleEntity }) => {
  // TODO Create single entity page
  return (
    <AdminGrid>
      {entities.map((entity) => {
        return (
          <AdminGridItem key={entity.id}>
            <EntityOverview
              entity={entity}
              key={entity.id}
              propsToDisplay={propsToDisplay}
              isSingleEntity={isSingleEntity}
            />
          </AdminGridItem>
        )
      })}
    </AdminGrid>
  )
}

EntityList.propTypes = {
  entities: PropTypes.array.isRequired,
  propsToDisplay: PropTypes.array.isRequired,
  isSingleEntity: PropTypes.bool.isRequired,
}

export default EntityList

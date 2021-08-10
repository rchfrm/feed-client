import React from 'react'
import PropTypes from 'prop-types'

import AdminGrid from '@/admin/elements/AdminGrid'
import AdminGridItem from '@/admin/elements/AdminGridItem'
import EntityOverview from '@/admin/EntityOverview'

const EntityList = ({ entities, propsToDisplay }) => {
  return (
    <AdminGrid>
      {entities.map((entity) => {
        return (
          <AdminGridItem key={entity.id}>
            <EntityOverview
              entity={entity}
              key={entity.id}
              propsToDisplay={propsToDisplay}
              isSingleEntity={false}
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
}

export default EntityList

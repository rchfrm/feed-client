import React from 'react'
import PropTypes from 'prop-types'
import CampaignsNode from '@/app/CampaignsNode'
import useBreakpointTest from '@/hooks/useBreakpointTest'

const CampaignsNodeGroup = ({
  group,
  nodeGroups,
  edges,
  updateEdges,
  getPosition,
}) => {
  const isDesktopLayout = useBreakpointTest('xs')

  return (
    <div className={isDesktopLayout ? null : 'relative w-3/4 mx-auto mb-8'}>
      {group.nodes.map((node, index) => (
        <CampaignsNode
          key={`${group.id}-${index}`}
          index={index}
          group={group}
          node={node}
          nodeGroups={nodeGroups}
          edges={edges}
          updateEdges={updateEdges}
          getPosition={getPosition}
          isActive={node.isActive}
        />
      ))}
    </div>
  )
}

CampaignsNodeGroup.propTypes = {
  group: PropTypes.object.isRequired,
  nodeGroups: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  updateEdges: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
}

export default CampaignsNodeGroup

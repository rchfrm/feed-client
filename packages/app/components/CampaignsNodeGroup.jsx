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
    <div
      className={[
        isDesktopLayout ? 'absolute' : 'relative w-3/4 mx-auto mb-12',
      ].join(' ')}
      style={{
        top: isDesktopLayout ? group.position.y : null,
        left: isDesktopLayout ? group.position.x : null,
        minHeight: ! isDesktopLayout ? 80 : null,
        height: ! isDesktopLayout ? group.nodes.length * 10 : null,
      }}
    >
      {group.nodes.map((node, index) => (
        <CampaignsNode
          key={`${group.id} -${index}`}
          index={index}
          group={group}
          node={node}
          nodeGroups={nodeGroups}
          edges={edges}
          updateEdges={updateEdges}
          getPosition={getPosition}
          isActive={group.isActive}
          isLast={index === group.nodes.length - 1}
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

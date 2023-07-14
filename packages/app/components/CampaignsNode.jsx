import React from 'react'
import PropTypes from 'prop-types'
import CampaignsNodeAudience from '@/app/CampaignsNodeAudience'
import CampaignsNodeCampaign from '@/app/CampaignsNodeCampaign'

const CampaignsNode = ({
  group,
  node,
  nodeGroups,
  edges,
  updateEdges,
  getPosition,
  isActive,
  isLast,
}) => {
  const { id: groupId, type } = group

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = (e) => {
    const sourceId = e.dataTransfer.getData('edge')
    const allowedTargetId = (Number(sourceId) + 1).toString()

    if (groupId === allowedTargetId) {
      const updatedEdges = edges.map((edge) => {
        return edge.source === sourceId ? { ...edge, isActive: true } : edge
      })

      const updatedNodes = nodeGroups.map((group) => {
        return group.id === groupId ? { ...group, isActive: true } : group
      })
      updateEdges(updatedEdges, updatedNodes)
    }
  }

  const nodeComponents = {
    audience: CampaignsNodeAudience,
    campaign: CampaignsNodeCampaign,
  }

  const Node = nodeComponents[type]

  return (
    <Node
      group={group}
      node={node}
      isActive={isActive}
      onDragOver={onDragOver}
      onDrop={onDrop}
      getPosition={getPosition}
      isLast={isLast}
    />
  )
}

CampaignsNode.propTypes = {
  index: PropTypes.number.isRequired,
  group: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  nodeGroups: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  updateEdges: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
}

export default CampaignsNode

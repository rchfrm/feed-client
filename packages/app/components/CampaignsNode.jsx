import React from 'react'
import PropTypes from 'prop-types'
import CampaignsNodeAudience from '@/app/CampaignsNodeAudience'
import CampaignsNodeCampaign from '@/app/CampaignsNodeCampaign'

const CampaignsNode = ({
  node,
  nodes,
  edges,
  updateEdges,
}) => {
  const { id, type } = node

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = (e) => {
    const sourceId = e.dataTransfer.getData('edge')
    const allowedTargetId = nodes.find((node) => node.id === sourceId).target

    if (id === allowedTargetId) {
      const updatedEdges = edges.map((edge) => {
        return edge.source === sourceId ? { ...edge, isActive: true } : edge
      })

      const updatedNodes = nodes.map((node) => {
        return node.id === id ? { ...node, isActive: true } : node
      })
      updateEdges(updatedEdges, updatedNodes)
    }
  }

  const onClick = () => {
    // eslint-disable-next-line
    console.log(id)
  }

  const nodeComponents = {
    audience: CampaignsNodeAudience,
    campaign: CampaignsNodeCampaign,
  }

  const Node = nodeComponents[type]

  return (
    <Node
      node={node}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    />
  )
}

CampaignsNode.propTypes = {
  node: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  updateEdges: PropTypes.func.isRequired,
}

export default CampaignsNode

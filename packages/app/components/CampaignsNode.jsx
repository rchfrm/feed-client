import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import CampaignsNodeConnector from '@/app/CampaignsNodeConnector'

const CampaignsNode = ({
  node,
  nodes,
  edges,
  updateEdges,
}) => {
  const isDesktopLayout = useBreakpointTest('xs')
  const nodeRef = React.useRef()

  const { id, handlers } = node

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = (e) => {
    const sourceId = e.dataTransfer.getData("edge")
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
    console.log(id)
  }

  return (
    <div
      id={id}
      ref={nodeRef}
      onClick={onClick}
      style={{
        order: !isDesktopLayout ? node.order : null,
        top: isDesktopLayout ? node.position.y : null,
        left: isDesktopLayout ? node.position.x : null,
      }}
      className={[
        'z-10 rounded-dialogue w-full',
        node.isActive ? 'opacity-100' : 'opacity-50',
        isDesktopLayout ? 'absolute' : 'mb-8',
        node.type === 'audience' ? 'xs:w-52 h-16 border-2 border-b-[6px] border-solid bg-gradient-2-light border-gradient-2-dark' : 'xs:w-40 h-20 bg-green-bg-light border-solid border-l-2 border-black'
      ].join(' ')}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {handlers.map((handler) => (
        <CampaignsNodeConnector
          key={handler.anchor.position}
          node={node}
          handler={handler}
          nodeRef={nodeRef}
        />
      ))}
    </div>
  )
}

CampaignsNode.propTypes = {
  node: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  updateEdges: PropTypes.func.isRequired,
}

export default CampaignsNode

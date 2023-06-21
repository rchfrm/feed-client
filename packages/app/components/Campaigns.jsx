import React from 'react'
import PropTypes from 'prop-types'
import Xarrow from 'react-xarrows'
import CampaignsNode from '@/app/CampaignsNode'
import useBreakpointTest from '@/hooks/useBreakpointTest'

const Campaigns = ({
  initialNodes,
  initialEdges,
}) => {
  const [nodes, setNodes] = React.useState(initialNodes)
  const [edges, setEdges] = React.useState(initialEdges)
  const isDesktopLayout = useBreakpointTest('xs')

  const updateEdges = (edges, nodes) => {
    setEdges(edges)
    setNodes(nodes)
  }

  return (
    <div className={isDesktopLayout ? 'relative' : 'flex flex-col'}>
      {nodes.map((node) => (
        <CampaignsNode
          key={node.id}
          node={node}
          nodes={nodes}
          edges={edges}
          updateEdges={updateEdges}
        />
      ))}
      {edges.map((edge) => {
        const startAnchor = nodes.find((node) => node.id === edge.source)?.handlers.find((handle) => handle.type === 'source')?.anchor
        const endAnchor = nodes.find((node) => node.id === edge.target)?.handlers.find((handle) => handle.type === 'target')?.anchor

        return (
          <Xarrow
            start={edge.source}
            end={edge.target}
            startAnchor={startAnchor}
            endAnchor={endAnchor}
            key={`${edge.source} - ${edge.source}`}
            path="grid"
            gridBreak="25%"
            strokeWidth={2}
            lineColor={edge.isActive ? '#5B82FB' : '#D0DBFF'}
            style={{ opacity: 0 }}
            showHead={false}
            dashness
          />
        )
      })}
    </div>
  )
}

Campaigns.propTypes = {
  initialNodes: PropTypes.array.isRequired,
  initialEdges: PropTypes.array.isRequired,
}

export default Campaigns

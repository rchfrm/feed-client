import React from 'react'
import PropTypes from 'prop-types'
import Xarrow from 'react-xarrows'
import CampaignsNode from '@/app/CampaignsNode'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import brandColors from '@/constants/brandColors'

const Campaigns = ({
  initialNodes,
  initialEdges,
}) => {
  const [nodes, setNodes] = React.useState(initialNodes)
  const [edges, setEdges] = React.useState(initialEdges)
  const isDesktopLayout = useBreakpointTest('xs')

  const getPosition = (handler) => {
    const position = ! isDesktopLayout
      ? handler.type === 'source' ? 'bottom' : 'top'
      : handler?.position

    return position
  }

  const updateEdges = (edges, nodes) => {
    setEdges(edges)
    setNodes(nodes)
  }

  return (
    <div className={isDesktopLayout ? 'relative h-[300px] overflow-hidden overflow-x-scroll' : 'flex flex-col items-center'}>
      {nodes.map((node) => (
        <CampaignsNode
          key={node.id}
          node={node}
          nodes={nodes}
          edges={edges}
          updateEdges={updateEdges}
          getPosition={getPosition}
        />
      ))}
      {edges.map((edge) => {
        const startAnchor = getPosition(nodes.find((node) => node.id === edge.source)?.handlers.find((handle) => handle.type === 'source'))
        const endAnchor = getPosition(nodes.find((node) => node.id === edge.target)?.handlers.find((handle) => handle.type === 'target'))

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
            lineColor={edge.isActive ? brandColors.gradient[2].dark : brandColors.gradient[2].light}
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

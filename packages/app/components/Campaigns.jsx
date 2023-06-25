import React from 'react'
import PropTypes from 'prop-types'
import Xarrow from 'react-xarrows'
import CampaignsNode from '@/app/CampaignsNode'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import brandColors from '@/constants/brandColors'

const Campaigns = ({
  initialNodeGroups,
  initialEdges,
}) => {
  const [nodeGroups, setNodeGroups] = React.useState(initialNodeGroups)
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
    setNodeGroups(nodes)
  }

  return (
    <div className={isDesktopLayout ? 'relative h-[350px] overflow-hidden overflow-x-scroll' : 'flex flex-col items-center'}>
      {nodeGroups.map((group) => (
        <div
          key={group.id}
          style={{
            top: isDesktopLayout ? group.position.y : null,
            left: isDesktopLayout ? group.position.x : null,
            minHeight: ! isDesktopLayout ? 80 : null,
            height: ! isDesktopLayout ? group.nodes.length * 10 : null,
          }}
          className={[
            isDesktopLayout ? 'absolute' : 'relative w-3/4 mx-auto mb-12',
          ].join(' ')}
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
      ))}
      {edges.map((edge) => {
        const sourceGroup = nodeGroups.find((group) => group?.id === edge.source)
        const targetGroup = nodeGroups.find((group) => group?.id === edge.target)

        if (! sourceGroup || ! targetGroup) {
          return
        }

        const startAnchor = getPosition(sourceGroup.nodes[0].handlers.find((handle) => handle.type === 'source'))
        const endAnchor = getPosition(targetGroup.nodes[0].handlers.find((handle) => handle.type === 'target'))

        return (
          <Xarrow
            key={edge.source}
            start={edge.source}
            end={edge.target}
            startAnchor={startAnchor}
            endAnchor={endAnchor}
            path="grid"
            gridBreak="25%"
            strokeWidth={2}
            lineColor={edge.isActive ? brandColors.gradient[2].dark : brandColors.gradient[2].light}
            showHead={false}
            dashness
          />
        )
      })}
    </div>
  )
}

Campaigns.propTypes = {
  initialNodeGroups: PropTypes.array.isRequired,
  initialEdges: PropTypes.array.isRequired,
}

export default Campaigns

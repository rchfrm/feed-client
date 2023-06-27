import React from 'react'
import PropTypes from 'prop-types'
import Xarrow from 'react-xarrows'
import CampaignsNodeGroup from '@/app/CampaignsNodeGroup'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import brandColors from '@/constants/brandColors'
import Spinner from '@/elements/Spinner'

const Campaigns = ({
  nodeGroups,
  setNodeGroups,
  edges,
  setEdges,
  isLoading,
}) => {
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
    <div className={[
      isDesktopLayout ? 'relative h-[350px] overflow-hidden overflow-x-scroll' : 'flex flex-col items-center',
    ].join(' ')}
    >
      {isLoading ? (
        <Spinner width={40} className="mt-20" />
      ) : (
        <>
          {nodeGroups.map((group) => (
            <CampaignsNodeGroup
              key={group.id}
              group={group}
              nodeGroups={nodeGroups}
              edges={edges}
              updateEdges={updateEdges}
              getPosition={getPosition}
            />
          ))}
          {edges.map((edge) => {
            const sourceGroup = nodeGroups.find((group) => group?.id === edge.source)
            const targetGroup = nodeGroups.find((group) => group?.id === edge.target)

            if (! sourceGroup || ! targetGroup) {
              return
            }

            const startAnchor = getPosition(sourceGroup.handlers.find((handle) => handle.type === 'source'))
            const endAnchor = getPosition(targetGroup.handlers.find((handle) => handle.type === 'target'))

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
        </>
      )}
    </div>
  )
}

Campaigns.propTypes = {
  nodeGroups: PropTypes.array.isRequired,
  setNodeGroups: PropTypes.func.isRequired,
  edges: PropTypes.array.isRequired,
  setEdges: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default Campaigns

import React from 'react'
import PropTypes from 'prop-types'
import Xarrow from 'react-xarrows'

const connectPointOffset = {
  left: {
    left: '0px',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  right: {
    left: '100%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  top: {
    left: '50%',
    top: '0px',
    transform: 'translate(-50%, -50%)',
  },
  bottom: {
    left: '30%',
    top: '105%',
    transform: 'translate(-50%, -50%)',
  },
}

const CampaignsNodeConnector = ({
  node,
  handler,
  nodeRef,
}) => {
  const [, setPosition] = React.useState({})
  const [isDragging, setIsDragging] = React.useState(false)
  const connectorRef = React.useRef()
  const { id } = node

  const onDragStart = (e) => {
    setIsDragging(true)
    e.dataTransfer.setData('edge', id)
  }

  const onDrag = (e) => {
    setPosition({})
    connectorRef.current.style.position = 'fixed'
    connectorRef.current.style.left = `${e.clientX}px`
    connectorRef.current.style.top = `${e.clientY}px`
    connectorRef.current.style.transform = 'none'
    connectorRef.current.style.opacity = 0.5
  }

  const onDragEnd = () => {
    setIsDragging(false)
    connectorRef.current.style.position = 'absolute'
    connectorRef.current.style.left = connectPointOffset[handler?.anchor.position].left
    connectorRef.current.style.top = connectPointOffset[handler?.anchor.position].top
    connectorRef.current.style.transform = connectPointOffset[handler?.anchor.position].transform
    connectorRef.current.style.opacity = 0.5
  }

  return (
    <>
      <div
        ref={connectorRef}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        className={[
          'absolute w-3 h-3 rounded-full',
          node.type === 'audience' ? 'bg-gradient-2-dark' : 'bg-green-bg-dark',
        ].join(' ')}
        style={{
          ...connectPointOffset[handler?.anchor.position],
        }}
        draggable
      />
      {isDragging ? (
        <Xarrow
          start={nodeRef}
          end={connectorRef}
          startAnchor={handler.anchor}
          lineColor="#5B82FB"
          strokeWidth={2}
          showHead={false}
          dashness
        />
      ) : null}
    </>
  )
}

CampaignsNodeConnector.propTypes = {
  node: PropTypes.object.isRequired,
  handler: PropTypes.object.isRequired,
  nodeRef: PropTypes.object.isRequired,
}

export default CampaignsNodeConnector

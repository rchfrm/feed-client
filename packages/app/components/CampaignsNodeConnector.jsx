import React from 'react'
import PropTypes from 'prop-types'
import Xarrow from 'react-xarrows'
import brandColors from '@/constants/brandColors'

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
    left: '50%',
    top: '100%',
    transform: 'translate(-50%, -50%)',
  },
}

const CampaignsNodeConnector = ({
  node,
  handler,
  nodeRef,
  className,
  getPosition,
}) => {
  const [, setPosition] = React.useState({})
  const [isDragging, setIsDragging] = React.useState(false)
  const connectorRef = React.useRef()
  const { id } = node
  const position = getPosition(handler)

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
    connectorRef.current.style.left = connectPointOffset[position].left
    connectorRef.current.style.top = connectPointOffset[position].top
    connectorRef.current.style.transform = connectPointOffset[position].transform
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
          'absolute w-2.5 h-2.5 rounded-full',
          className,
        ].join(' ')}
        style={{
          ...connectPointOffset[position],
        }}
        draggable
      />
      {isDragging ? (
        <Xarrow
          start={nodeRef}
          end={connectorRef}
          startAnchor={position}
          lineColor={brandColors.gradient[2].dark}
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

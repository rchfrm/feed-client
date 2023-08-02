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
  id,
  handler,
  nodeRef,
  className,
  getPosition,
}) => {
  const [, setPosition] = React.useState({})
  const [isDragging, setIsDragging] = React.useState(false)
  const connectorRef = React.useRef()
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
          'absolute w-0 h-0 rounded-full',
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
  id: PropTypes.string.isRequired,
  handler: PropTypes.object.isRequired,
  nodeRef: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  getPosition: PropTypes.func.isRequired,
}

export default CampaignsNodeConnector

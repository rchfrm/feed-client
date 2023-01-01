import React from 'react'
import PropTypes from 'prop-types'

const getRotation = (direction) => {
  switch (direction) {
    case 'down':
      return 90
    case 'up':
      return -90
    case 'left':
      return 180
    default:
      return 0
  }
}

const ChevronDoubleIcon = ({
  className,
  style,
  direction,
}) => {
  const rotation = getRotation(direction)

  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        ...style,
        ...(rotation && { transform: `rotate(${rotation}deg)` }),
      }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L17.5858 12L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289ZM6.29289 5.29289C6.68342 4.90237 7.31658 4.90237 7.70711 5.29289L13.7071 11.2929C13.8946 11.4804 14 11.7348 14 12C14 12.2652 13.8946 12.5196 13.7071 12.7071L7.70711 18.7071C7.31658 19.0976 6.68342 19.0976 6.29289 18.7071C5.90237 18.3166 5.90237 17.6834 6.29289 17.2929L11.5858 12L6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289Z"
      />
    </svg>
  )
}

ChevronDoubleIcon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  direction: PropTypes.string,
}

ChevronDoubleIcon.defaultProps = {
  className: 'fill-black',
  style: null,
  direction: 'right',
}

export default ChevronDoubleIcon

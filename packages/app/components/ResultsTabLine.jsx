import React from 'react'
import PropTypes from 'prop-types'

const ResultsTabLine = ({ index, isActive }) => {
  const getWidth = () => {
    switch (index) {
      case 0:
        return '25%'
      case 1:
        return '125%'
      case 2:
        return '250%'
      default:
        return '100%'
    }
  }

  const getRightOffset = () => {
    switch (index) {
      case 0:
        return '75%'
      case 1:
        return '175%'
      case 2:
        return '300%'
      default:
        return '100%'
    }
  }

  return (
    isActive && (
      <>
        <span
          className="absolute h-4 bg-black"
          style={{
            width: '1px',
            top: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        <span
          className="absolute bg-black"
          style={{
            height: '1px',
            width: getWidth(),
            top: '75px',
            right: '50%',
          }}
        />
        <span
          className="absolute h-4 bg-black"
          style={{
            width: '1px',
            top: '75px',
            right: getRightOffset(),
          }}
        />
      </>
    )
  )
}

ResultsTabLine.propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default ResultsTabLine

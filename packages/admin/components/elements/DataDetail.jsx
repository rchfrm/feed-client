import React from 'react'
import PropTypes from 'prop-types'

const DataDetail = ({ name, value, border }) => {
  return (
    <>
      {border && <hr />}
      <p>
        <span>{name}:</span>
        {' '}
        <strong>{value}</strong>
      </p>
    </>
  )
}

DataDetail.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.string.isRequired,
  border: PropTypes.bool,
}

DataDetail.defaultProps = {
  border: false,
}

export default DataDetail

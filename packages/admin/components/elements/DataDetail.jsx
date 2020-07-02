import React from 'react'
import PropTypes from 'prop-types'

import CopyTextButton from '@/elements/CopyTextButton'

const DataDetail = ({ name, value, border, copy }) => {
  return (
    <>
      {border && <hr />}
      <p>
        <span>{name}:</span>
        {' '}
        {copy ? (
          <CopyTextButton text={value} className="ml-2" />
        ) : (
          <strong>{value}</strong>
        )}
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
  copy: PropTypes.bool,
}

DataDetail.defaultProps = {
  border: false,
  copy: false,
}

export default DataDetail

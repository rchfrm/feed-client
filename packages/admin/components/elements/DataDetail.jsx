import React from 'react'
import PropTypes from 'prop-types'

import CopyTextButton from '@/elements/CopyTextButton'

const DataDetail = ({ name, value, border, copy, isLink }) => {
  const innerText = !isLink ? value : (
    <a href={value} target="_blank" rel="noreferrer noopener">{value}</a>
  )
  return (
    <>
      {border && <hr />}
      <p>
        <span>{name}:</span>
        {' '}
        {copy ? (
          <CopyTextButton text={value} className="ml-2" />
        ) : (
          <strong>{innerText}</strong>
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
  isLink: PropTypes.bool,
}

DataDetail.defaultProps = {
  border: false,
  copy: false,
  isLink: false,
}

export default DataDetail

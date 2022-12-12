import React from 'react'
import PropTypes from 'prop-types'

import CopyTextButton from '@/elements/CopyTextButton'

const getInnerText = (value, isLink, isEmail) => {
  if (! isLink && ! isEmail) return value
  if (isLink) {
    return (
      <a href={value} target="_blank" rel="noreferrer noopener">{value}</a>
    )
  }
  if (isEmail) {
    return (
      <a href={`mailto:${value}`}>{value}</a>
    )
  }
}

const DataDetail = ({ name, value, border, copyText, isLink }) => {
  const isEmail = name === 'email'
  const innerText = getInnerText(value, isLink, isEmail)

  return (
    <>
      {border && <hr />}
      <p>
        <span>{name}:</span>
        {' '}
        {copyText ? (
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
  copyText: PropTypes.bool,
  isLink: PropTypes.bool,
}

DataDetail.defaultProps = {
  border: false,
  copyText: false,
  isLink: false,
}

export default DataDetail

import React from 'react'
import PropTypes from 'prop-types'

function PageHeader({ heading, punctuation, className }) {
  return (
    <div className={className}>
      <h1>{heading + punctuation}</h1>
    </div>
  )
}

PageHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  punctuation: PropTypes.string,
  className: PropTypes.string,
}

PageHeader.defaultProps = {
  punctuation: '.',
  className: '',
}


export default PageHeader

import React from 'react'
import PropTypes from 'prop-types'

function PageHeader({ punctuation = '.', heading, className }) {
  const classses = ['page--header', className].join(' ')
  return (
    <div className={classses}>
      <h1>{heading + punctuation}</h1>
    </div>
  )
}

PageHeader.propTypes = {
  punctuation: PropTypes.string,
  heading: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PageHeader.defaultProps = {
  punctuation: '.',
  className: '',
}


export default PageHeader

import React from 'react'
import PropTypes from 'prop-types'

const SectionHeader = ({ header }) => {
  return (
    <>
      <h4 className="h3 mb-2"><strong>{header}</strong></h4>
      <div style={{ height: 2 }} className="w-full bg-green mb-8" />
    </>
  )
}

SectionHeader.propTypes = {
  header: PropTypes.string.isRequired,
}

export default SectionHeader

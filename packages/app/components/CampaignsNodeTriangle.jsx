import React from 'react'
import PropTypes from 'prop-types'

const CampaignsNodeTriangle = ({ isActive, className, activeClass }) => {
  return (
    <div className={[
      'absolute',
      'w-0 h-0',
      'border-t-0 border-r-[24px] border-b-[41px] border-l-0',
      'border-solid',
      'border-l-transparent border-b-transparent border-t-transparent',
      isActive ? activeClass : null,
      className,
    ].join(' ')}
    />
  )
}

CampaignsNodeTriangle.propTypes = {
  isActive: PropTypes.bool,
  className: PropTypes.string.isRequired,
  activeClass: PropTypes.string.isRequired,
}

CampaignsNodeTriangle.defaultProps = {
  isActive: false,
}

export default CampaignsNodeTriangle

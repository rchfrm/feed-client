import React from 'react'
import PropTypes from 'prop-types'

const ConnectProfilesCardSelectPlaceholder = ({
  label,
  title,
  className,
}) => {
  return (
    <div className={className}>
      <span className="inputLabel__text">{label}</span>
      <div className="flex items-center h-14 px-3 bg-grey-2 rounded-button">
        <span className="block w-full truncate">{title}</span>
      </div>
    </div>
  )
}

ConnectProfilesCardSelectPlaceholder.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ConnectProfilesCardSelectPlaceholder.defaultProps = {
  className: null,
}

export default ConnectProfilesCardSelectPlaceholder

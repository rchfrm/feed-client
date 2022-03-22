import React from 'react'
import PropTypes from 'prop-types'

const ProfileStatus = ({ className }) => {
  return (
    <div className={[className].join(' ')}>
      <p className="mb-0">What's your objective</p>
    </div>
  )
}

ProfileStatus.propTypes = {
  className: PropTypes.string,
}

ProfileStatus.defaultProps = {
  className: '',
}


export default ProfileStatus

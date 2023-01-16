import React from 'react'
import PropTypes from 'prop-types'

const ProfileStatusMobileBar = ({ children, backgroundStyle, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={[
        'relative h-7 flex items-center justify-center w-full text-offwhite text-xs',
        className,
      ].join(' ')}
      style={{ ...backgroundStyle, left: '50%' }}
    >
      {children}
    </button>
  )
}

ProfileStatusMobileBar.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundStyle: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

ProfileStatusMobileBar.defaultProps = {
  backgroundStyle: null,
  onClick: () => {},
  className: '',
}

export default ProfileStatusMobileBar

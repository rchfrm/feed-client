import React from 'react'
import PropTypes from 'prop-types'

const MyReferralCodeContent = ({ className }) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      Content
    </div>
  )
}

MyReferralCodeContent.propTypes = {
  className: PropTypes.string,
}

MyReferralCodeContent.defaultProps = {
  className: null,
}

export default MyReferralCodeContent

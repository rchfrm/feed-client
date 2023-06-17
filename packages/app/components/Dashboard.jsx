import React from 'react'
import PropTypes from 'prop-types'

const Dashboard = ({ className }) => {
  return (
    <div className={className}>
      Dashboard
    </div>
  )
}

Dashboard.propTypes = {
  className: PropTypes.string,
}

Dashboard.defaultProps = {
  className: '',
}

export default Dashboard

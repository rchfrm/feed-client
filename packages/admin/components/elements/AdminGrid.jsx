import React from 'react'
import PropTypes from 'prop-types'

const AdminGrid = ({ children }) => {
  return (
    <ul className="grid grid-cols-12 sm:gap-x-4 gap-y-10 pt-5">
      {children}
    </ul>
  )
}

AdminGrid.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AdminGrid

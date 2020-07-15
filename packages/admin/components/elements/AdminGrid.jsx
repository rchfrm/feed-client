import React from 'react'
import PropTypes from 'prop-types'

const AdminGrid = ({ children }) => {
  return (
    <ul className="grid grid-cols-12 sm:col-gap-4 row-gap-10 pt-5">
      {children}
    </ul>
  )
}

AdminGrid.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AdminGrid

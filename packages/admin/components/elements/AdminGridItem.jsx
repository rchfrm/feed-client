import React from 'react'
import PropTypes from 'prop-types'

const AdminGridItem = ({ children, className }) => {
  return (
    <li
      className={[
        'col-span-12',
        'sm:col-span-6',
        className,
      ].join(' ')}
    >
      {children}
    </li>
  )
}

AdminGridItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

AdminGridItem.defaultProps = {
  className: '',
}


export default AdminGridItem

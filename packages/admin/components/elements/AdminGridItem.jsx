import React from 'react'
import PropTypes from 'prop-types'

const AdminGridItem = ({ children, forceFullWidth, className }) => {
  return (
    <li
      className={[
        'col-span-12',
        `${! forceFullWidth ? 'sm:col-span-6' : ''}`,
        className,
      ].join(' ')}
    >
      {children}
    </li>
  )
}

AdminGridItem.propTypes = {
  children: PropTypes.node.isRequired,
  forceFullWidth: PropTypes.bool,
  className: PropTypes.string,
}

AdminGridItem.defaultProps = {
  className: '',
  forceFullWidth: false,
}


export default AdminGridItem

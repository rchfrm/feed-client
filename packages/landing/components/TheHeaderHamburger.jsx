import React from 'react'
import PropTypes from 'prop-types'
import MenuIcon from '@/icons/MenuIcon'
import CrossIcon from '@/icons/CrossIcon'

const TheHeaderHamburger = ({ linksOpen, toggleLinks, className }) => {
  return (
    <button
      type="button"
      onClick={toggleLinks}
      aria-label="Open menu"
      className={className}
    >
      {linksOpen ? (
        <CrossIcon className="w-10 h-auto" />
      ) : (
        <MenuIcon className="w-10 h-auto" />
      )}
    </button>

  )
}

TheHeaderHamburger.propTypes = {
  linksOpen: PropTypes.bool.isRequired,
  toggleLinks: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TheHeaderHamburger.defaultProps = {
  className: null,
}

export default TheHeaderHamburger

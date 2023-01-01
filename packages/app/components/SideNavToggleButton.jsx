import React from 'react'
import PropTypes from 'prop-types'
import ChevronDoubleIcon from '@/icons/ChevronDoubleIcon'

const SideNavToggleButton = ({ isExpanded, toggleNav }) => {
  const handleClick = () => {
    toggleNav()
  }

  return (
    <button
      onClick={handleClick}
      className={[
        'absolute top-1/2 -translate-y-1/2 -right-2 h-16 w-6 bg-black rounded-lg',
      ].join(' ')}
    >
      <ChevronDoubleIcon
        direction={isExpanded ? 'left' : 'right'}
        className="fill-grey-1 hover:fill-green"
      />
    </button>
  )
}

SideNavToggleButton.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
}

export default SideNavToggleButton

import React from 'react'
import PropTypes from 'prop-types'
import ChevronDoubleIcon from '@/icons/ChevronDoubleIcon'
import brandColors from '@/constants/brandColors'

const SideNavToggleButton = ({ isExpanded, toggleNav }) => {
  const [isHover, setIsHover] = React.useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMousLeave = () => {
    setIsHover(false)
  }

  const handleClick = () => {
    toggleNav()
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMousLeave}
      className={[
        'absolute top-1/2 -translate-y-1/2 -right-2 h-16 w-6 bg-black rounded-lg',
      ].join(' ')}
    >
      <ChevronDoubleIcon
        direction={isExpanded ? 'left' : 'right'}
        fill={isHover || isExpanded ? brandColors.green : brandColors.greyDark}
      />
    </button>
  )
}

SideNavToggleButton.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
}

export default SideNavToggleButton

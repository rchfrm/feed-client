import React from 'react'
import PropTypes from 'prop-types'
import useHover from '@/app/hooks/useHover'
import ChevronDoubleIcon from '@/icons/ChevronDoubleIcon'
import brandColors from '@/constants/brandColors'

const SideNavToggleButton = ({ isExpanded, toggleNav }) => {
  const [hoverRef, isHover] = useHover()

  const handleClick = () => {
    toggleNav()
  }

  return (
    <button
      onClick={handleClick}
      className={[
        'absolute top-1/2 -translate-y-1/2 -right-2 h-16 w-6 bg-black rounded-lg',
      ].join(' ')}
      ref={hoverRef}
    >
      <ChevronDoubleIcon
        direction={isExpanded ? 'left' : 'right'}
        fill={isHover ? brandColors.green : brandColors.grey}
      />
    </button>
  )
}

SideNavToggleButton.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
}

export default SideNavToggleButton

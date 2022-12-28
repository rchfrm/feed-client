import React from 'react'
import PropTypes from 'prop-types'
import HamburgerIcon from '@/icons/HamburgerIcon'
import brandColors from '@/constants/brandColors'

const HeaderMenuButton = ({ toggle }) => {
  const [isHover, setIsHover] = React.useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMousLeave = () => {
    setIsHover(false)
  }

  const toggleMenu = () => {
    toggle()
  }

  return (
    <button
      onClick={toggleMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMousLeave}
      className="flex items-center h-8 text-white no-underline px-3 py-2 rounded-full bg-blackHover hover:text-green"
    >
      <figure className="mr-2">
        <HamburgerIcon fill={isHover ? brandColors.green : brandColors.white} className="w-full h-auto" />
      </figure>
      Menu
    </button>
  )
}

HeaderMenuButton.propTypes = {
  toggle: PropTypes.func.isRequired,
}

export default HeaderMenuButton

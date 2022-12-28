import React from 'react'
import PropTypes from 'prop-types'
import HamburgerIcon from '@/icons/HamburgerIcon'
import brandColors from '@/constants/brandColors'

const HeaderMenuButton = ({ toggleSubNav }) => {
  const toggle = () => {
    toggleSubNav()
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center h-8 text-white no-underline px-3 py-2 rounded-full bg-blackHover"
    >
      <figure className="mr-2">
        <HamburgerIcon fill={brandColors.white} className="w-full h-auto" />
      </figure>
      Menu
    </button>
  )
}

HeaderMenuButton.propTypes = {
  toggleSubNav: PropTypes.func.isRequired,
}

export default HeaderMenuButton

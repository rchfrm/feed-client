import React from 'react'
import PropTypes from 'prop-types'
import HamburgerIcon from '@/icons/HamburgerIcon'
import brandColors from '@/constants/brandColors'

const SubNavMenuButton = ({ toggleSubNav }) => {
  const toggle = () => {
    toggleSubNav()
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center h-8 text-offwhite no-underline px-3 py-2 rounded-full bg-blackHover"
    >
      <figure className="mr-2">
        <HamburgerIcon fill={brandColors.offwhite} className="w-full h-auto" />
      </figure>
      Menu
    </button>
  )
}

SubNavMenuButton.propTypes = {
  toggleSubNav: PropTypes.func.isRequired,
}

export default SubNavMenuButton

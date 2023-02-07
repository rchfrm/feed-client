import React from 'react'
import PropTypes from 'prop-types'
import useHover from '@/app/hooks/useHover'
import SwitchIcon from '@/icons/SwitchIcon'
import brandColors from '@/constants/brandColors'

const SideNavProfilesSwitchProfile = ({
  shouldShowMore,
  setShouldShowMore,
  isExpanded,
}) => {
  const [hoverRef, isHover] = useHover()

  const handleClick = () => {
    setShouldShowMore((shouldShowMore) => ! shouldShowMore)
  }

  return (
    <button
      className={[
        'flex items-center',
        'h-14 w-full mb-0',
        'border-b border-solid border-anthracite',
        'hover:text-green text-grey',
        isExpanded ? null : 'justify-center',
      ].join(' ')}
      onClick={handleClick}
      ref={hoverRef}
    >
      <SwitchIcon fill={isHover || shouldShowMore ? brandColors.green : brandColors.greyDark} />
      <p
        className={[
          'text-base mb-0',
          isExpanded ? 'opacity-1 w-auto delay-300 ml-2 transition-opacity' : 'opacity-0 w-0 mr-0',
          shouldShowMore ? 'text-green' : null,
        ].join(' ')}
      >
        Switch profile
      </p>
    </button>
  )
}

SideNavProfilesSwitchProfile.propTypes = {
  shouldShowMore: PropTypes.bool.isRequired,
  setShouldShowMore: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
}

export default SideNavProfilesSwitchProfile

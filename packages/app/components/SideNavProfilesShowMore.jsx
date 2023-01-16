import React from 'react'
import PropTypes from 'prop-types'
import useHover from '@/app/hooks/useHover'
import ChevronIcon from '@/icons/ChevronIcon'
import brandColors from '@/constants/brandColors'

const SideNavProfilesShowMore = ({
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
        'h-12 w-full mb-0',
        'border-b border-solid border-anthracite',
        'hover:text-green text-grey-2',
        isExpanded ? null : 'justify-center',
      ].join(' ')}
      onClick={handleClick}
      ref={hoverRef}
    >
      <p
        className={[
          'text-base mb-0',
          isExpanded ? 'opacity-1 w-auto delay-300 mr-2 transition-opacity' : 'opacity-0 w-0 mr-0',
          shouldShowMore ? 'text-green' : null,
        ].join(' ')}
      >
        More accounts
      </p>
      <ChevronIcon direction={shouldShowMore ? 'up' : 'down'} fill={isHover || shouldShowMore ? brandColors.green : brandColors.grey} />
    </button>
  )
}

SideNavProfilesShowMore.propTypes = {
  shouldShowMore: PropTypes.bool.isRequired,
  setShouldShowMore: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
}

export default SideNavProfilesShowMore

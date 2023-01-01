import React from 'react'
import PropTypes from 'prop-types'
import ChevronIcon from '@/icons/ChevronIcon'
import brandColors from '@/constants/brandColors'

const SideNavProfilesShowMore = ({
  shouldShowMore,
  setShouldShowMore,
  isExpanded,
}) => {
  const [isHover, setIsHover] = React.useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMousLeave = () => {
    setIsHover(false)
  }

  const handleClick = () => {
    setShouldShowMore((shouldShowMore) => ! shouldShowMore)
  }

  return (
    <button
      className={[
        'flex items-center',
        'h-12 w-full mb-0',
        'border-b border-solid border-grey-3',
        'hover:text-green text-grey-2',
        isExpanded ? 'justify-start' : 'justify-center',
      ].join(' ')}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMousLeave}
    >
      {isExpanded && (
        <p className="text-base mr-2 mb-0">More accounts</p>
      )}
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

import React from 'react'
import PropTypes from 'prop-types'
import ChevronIcon from '@/icons/ChevronIcon'
import brandColors from '@/constants/brandColors'

const SideNavProfilesShowMore = ({ shouldShowMore, setShouldShowMore }) => {
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
        'flex justify-center items-center',
        'h-12 w-full mb-0',
        'border-b border-solid border-grey-3 text-grey-2',
      ].join(' ')}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMousLeave}
    >
      <ChevronIcon direction={shouldShowMore ? 'up' : 'down'} fill={isHover ? brandColors.green : brandColors.grey} />
    </button>
  )
}

SideNavProfilesShowMore.propTypes = {
  shouldShowMore: PropTypes.bool.isRequired,
  setShouldShowMore: PropTypes.func.isRequired,
}

export default SideNavProfilesShowMore

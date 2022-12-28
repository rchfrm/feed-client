import React from 'react'
import ChevronIcon from '@/icons/ChevronIcon'
import brandColors from '@/constants/brandColors'

const SideNavProfilesShowMore = () => {
  const [isHover, setIsHover] = React.useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMousLeave = () => {
    setIsHover(false)
  }

  return (
    <button
      className={[
        'flex justify-center items-center',
        'h-12 w-full mb-0',
        'border-b border-solid border-grey-3 text-white',
      ].join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMousLeave}
    >
      <ChevronIcon direction="down" className="w-2" fill={isHover ? brandColors.green : brandColors.white} />
    </button>
  )
}

export default SideNavProfilesShowMore

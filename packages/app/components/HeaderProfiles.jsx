import React from 'react'
import HeaderProfileButton from '@/app/HeaderProfileButton'
import ProfilesList from '@/app/ProfilesList'

const HeaderProfiles = () => {
  const [shouldShowMore, setShouldShowMore] = React.useState(false)

  return (
    <div className="flex justify-center items-center w-full h-20">
      <HeaderProfileButton
        shouldShowMore={shouldShowMore}
        setShouldShowMore={setShouldShowMore}
      />
      {shouldShowMore && (
        <ProfilesList
          setShouldShowMore={setShouldShowMore}
        />
      )}
    </div>
  )
}

export default HeaderProfiles

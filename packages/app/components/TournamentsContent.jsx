import React from 'react'
// import PropTypes from 'prop-types'

import TournamentsAudienceFilters from '@/app/TournamentsAudienceFilters'

import brandColors from '@/constants/brandColors'

const audienceTypes = [
  {
    id: 'warm',
    title: 'Warm',
    color: brandColors.red,
    activeTextColor: brandColors.white,
  },
  {
    id: 'cool',
    title: 'Cool',
    color: brandColors.soundcloud.bg,
    activeTextColor: brandColors.soundcloud.text,
  },
  {
    id: 'cold',
    title: 'Cold',
    color: brandColors.twitter.bg,
    activeTextColor: brandColors.twitter.text,
  },
]

const TournamentsContent = () => {
  const [currentAudienceType, setCurrentAudienceType] = React.useState(audienceTypes[0].id)
  return (
    <div>
      <TournamentsAudienceFilters
        audienceTypes={audienceTypes}
        currentAudienceType={currentAudienceType}
        setCurrentAudienceType={setCurrentAudienceType}
      />
    </div>
  )
}

// TournamentsContent.propTypes = {

// }

export default TournamentsContent

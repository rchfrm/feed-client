import React from 'react'
import PropTypes from 'prop-types'

import { TournamentContextProvider } from '@/app/contexts/TournamentContext'

import TournamentsLoader from '@/app/TournamentsLoader'

import { getAudienceIdFromSlug } from '@/app/helpers/funnelHelpers'

const TournamentsContent = ({
  audienceSlug,
  adTypeId,
}) => {
  if (!audienceSlug || !adTypeId) {
    console.log('NO NO')
    return null
  }

  const audienceId = getAudienceIdFromSlug(audienceSlug)

  return (
    <TournamentContextProvider>
      <div>
        <section id="TournamentItemsContainer" className="mt-5">
          <TournamentsLoader
            audienceId={audienceId}
            adTypeId={adTypeId}
          />
        </section>
      </div>
    </TournamentContextProvider>
  )
}

TournamentsContent.propTypes = {
  audienceSlug: PropTypes.string,
  adTypeId: PropTypes.string,
}

TournamentsContent.defaultProps = {
  audienceSlug: '',
  adTypeId: '',
}


export default TournamentsContent

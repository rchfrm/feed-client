import React from 'react'
import PropTypes from 'prop-types'

import { TournamentContextProvider } from '@/app/contexts/TournamentContext'

import TournamentsLoader from '@/app/TournamentsLoader'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'

const TournamentsContent = ({
  audience,
  adType,
}) => {

  if (!audience || !adType) {
    console.log('NO NO')
    return null
  }

  return (
    <TournamentContextProvider>
      <div>
        <section id="TournamentItemsContainer" className="mt-5">
          <TournamentsLoader
            audienceName={audience}
            tournamentType={adType}
          />
        </section>
      </div>
    </TournamentContextProvider>
  )
}

TournamentsContent.propTypes = {
  audience: PropTypes.string,
  adType: PropTypes.string,
}

TournamentsContent.defaultProps = {
  audience: '',
  adType: '',
}


export default TournamentsContent

import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/contexts/ArtistContext'
import { TournamentContextProvider } from '@/app/contexts/TournamentContext'

import MarkdownText from '@/elements/MarkdownText'

import TournamentsLoader from '@/app/TournamentsLoader'

import { getAudienceIdFromSlug } from '@/app/helpers/funnelHelpers'

import { copy } from '@/app/copy/tournamentsCopy'

const TournamentsContent = ({
  audienceSlug,
  adTypeId,
}) => {
  const { artistId, artistLoading } = React.useContext(ArtistContext)

  if (!artistLoading && (!audienceSlug || !adTypeId)) {
    return <MarkdownText markdown={copy.noQueryDefined} />
  }

  const audienceId = getAudienceIdFromSlug(audienceSlug)

  return (
    <TournamentContextProvider>
      <div>
        <section id="TournamentItemsContainer">
          <TournamentsLoader
            artistId={artistId}
            artistLoading={artistLoading}
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

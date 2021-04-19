import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TournamentContextProvider } from '@/app/contexts/TournamentContext'

import MarkdownText from '@/elements/MarkdownText'

import TournamentsHeader from '@/app/TournamentsHeader'
import TournamentsLoader from '@/app/TournamentsLoader'

import { getAudiencePropFromSlug } from '@/app/helpers/funnelHelpers'

import { copy } from '@/app/copy/tournamentsCopy'

const TournamentsContent = ({
  audienceSlug,
  adTypeId,
}) => {
  const { artistId, artistLoading } = React.useContext(ArtistContext)

  if (!artistLoading && (!audienceSlug || !adTypeId)) {
    return <MarkdownText markdown={copy.noQueryDefined} />
  }

  const audienceId = getAudiencePropFromSlug(audienceSlug, 'id')

  return (
    <TournamentContextProvider>
      <div>
        <section id="TournamentItemsContainer">
          {/* HEADER */}
          <TournamentsHeader
            audienceSlug={audienceSlug}
            adTypeId={adTypeId}
            className="mt-1 mb-5"
          />
          {/* LOADER */}
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

import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'
import ButtonNew from '@/elements/ButtonNew'

import * as ROUTES from '@/admin/constants/routes'

const TournamentLink = ({
  artistId,
  campaignId,
  adsetId,
  tournamentId,
  buttonText,
  buttonClass,
  overviewLink,
  linkType,
}) => {
  const pathname = overviewLink ? ROUTES.TOURNAMENTS : ROUTES.TOURNAMENT
  const query = overviewLink ? { artistId } : {
    artistId,
    campaignId,
    adsetId,
    tournamentId,
  }
  return (
    <Link
      href={{
        pathname,
        query,
      }}
    >
      {linkType === 'anchor' ? (
        <a>{buttonText}</a>
      ) : (
        <ButtonNew className={buttonClass} version="small" wrapper="a" trackComponentName="TournamentLink">
          {buttonText}
        </ButtonNew>
      )}
    </Link>
  )
}

TournamentLink.propTypes = {
  artistId: PropTypes.string.isRequired,
  campaignId: PropTypes.string,
  adsetId: PropTypes.string,
  tournamentId: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  buttonClass: PropTypes.string,
  overviewLink: PropTypes.bool,
  linkType: PropTypes.string,
}

TournamentLink.defaultProps = {
  campaignId: '',
  adsetId: '',
  tournamentId: '',
  buttonClass: 'w-48',
  overviewLink: false,
  linkType: 'button',
}


export default TournamentLink

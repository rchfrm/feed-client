import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'
import Button from '@/elements/Button'

import * as ROUTES from '@/admin/constants/routes'

const TournamentLink = ({
  artistId,
  campaignId,
  adsetId,
  tournamentId,
  buttonText,
  buttonClass,
}) => {
  return (
    <Link
      href={{
        pathname: ROUTES.TOURNAMENT,
        query: {
          artistId,
          campaignId,
          adsetId,
          tournamentId,
        } }}
    >
      <Button className={buttonClass} version="black small" wrapper="a">
        {buttonText}
      </Button>
    </Link>
  )
}

TournamentLink.propTypes = {
  artistId: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  adsetId: PropTypes.string.isRequired,
  tournamentId: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonClass: PropTypes.string,
}

TournamentLink.defaultProps = {
  buttonClass: 'w-48',
}


export default TournamentLink

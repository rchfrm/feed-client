import React from 'react'
import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import GetStartedConnectFacebookConnectedProfileItem from '@/app/GetStartedConnectFacebookConnectedProfileItem'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const GetStartedConnectFacebookConnectedProfile = ({ connectedArtists }) => {
  const { next } = React.useContext(WizardContext)

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="mb-5 sm:mb-0 font-medium text-lg">You succesfully connected the following profile:</h3>
      <div className="flex flex-1 flex-column justify-center items-center">
        <ul className="mb-12">
          {connectedArtists.map((artist) => {
            return (
              <GetStartedConnectFacebookConnectedProfileItem
                key={artist.id}
                profile={artist}
              />
            )
          })}
        </ul>
        <Button
          version="green"
          onClick={next}
          className="w-full sm:w-48"
          trackComponentName="GetStartedConnectFacebookConnectedProfile"
        >
          Next
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill="white"
          />
        </Button>
      </div>
    </div>
  )
}

GetStartedConnectFacebookConnectedProfile.propTypes = {
  connectedArtists: PropTypes.array.isRequired,
}

GetStartedConnectFacebookConnectedProfile.defaultProps = {
}

export default GetStartedConnectFacebookConnectedProfile

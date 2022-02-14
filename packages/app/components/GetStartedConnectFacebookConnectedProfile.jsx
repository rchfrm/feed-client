import React from 'react'
import PropTypes from 'prop-types'

import ArtistImage from '@/elements/ArtistImage'
import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import { WizardContext } from '@/app/contexts/WizardContext'

const GetStartedConnectFacebookConnectedProfile = ({ connectedArtists }) => {
  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    next()
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-0 font-medium text-xl">You're currently setting up:</h3>
      <div className="flex flex-1 flex-column justify-center items-center">
        <ul className="mb-12">
          {connectedArtists.map((artist) => {
            const { id, name, role, facebook_page_id } = artist
            return (
              <li
                key={id}
                className="flex items-center"
              >
                <ArtistImage
                  className="h-16 w-auto rounded-full"
                  pageId={facebook_page_id}
                  name={name}
                />
                <div className="ml-6">
                  <p className="mb-1 font-bold">{name}</p>
                  <p className="text-sm mb-0">{role}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <Button
          version="green"
          onClick={handleNext}
          className="w-48"
          trackComponentName="GetStartedDailyBudgetStep"
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

import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import useBillingStore from '@/app/stores/billingStore'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ArtistImage from '@/elements/ArtistImage'
import ArrowIcon from '@/icons/ArrowIcon'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import * as ROUTES from '@/app/constants/routes'
import { getLocalStorage } from '@/helpers/utils'

const getBillingStoreState = (state) => ({
  organization: state.organization,
})

const ConnectProfilesItem = ({
  profile,
  setSelectedProfile,
  setIsConnecting,
  isConnected,
  setErrors,
  className,
}) => {
  const { name, page_id, instagram_username } = profile
  const { user } = React.useContext(UserContext)
  const { connectArtist } = React.useContext(ArtistContext)
  const { organization } = useBillingStore(getBillingStoreState)
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const isManaged = organization.is_managed
  let { plan } = wizardState || {}

  const createArtist = async () => {
    setIsConnecting(true)
    setSelectedProfile(profile)

    if (isManaged) {
      plan = 'legacy_monthly'
    }

    // Santise URLs
    const artistAccountSanitised = artistHelpers.sanitiseArtistAccountUrls(profile)
    const { error } = await connectArtist(artistAccountSanitised, user, plan, isManaged) || {}

    if (error) {
      setIsConnecting(false)
      setErrors([error])
      return
    }

    Router.push(ROUTES.GET_STARTED)
  }

  const Wrapper = isConnected ? 'div' : 'button'

  return (
    <li
      className={[
        'relative',
        className,
        isConnected ? 'pointer-events-none' : null,
      ].join(' ')}
    >
      <Wrapper onClick={createArtist} className="flex items-center">
        <ArtistImage
          name={name}
          pageId={page_id}
          className="h-16 w-auto rounded-full mr-4"
        />
        <div className="font-bold font-body text-md text-left">{name}
          {instagram_username && <span className="block mb-0 font-normal"> (@{instagram_username})</span>}
        </div>
        {! isConnected && (
          <div className="flex-1">
            <ArrowIcon direction="right" className="ml-4" />
          </div>
        )}
      </Wrapper>
    </li>
  )
}

ConnectProfilesItem.propTypes = {
  profile: PropTypes.object.isRequired,
  setSelectedProfile: PropTypes.func,
  setIsConnecting: PropTypes.func,
  isConnected: PropTypes.bool.isRequired,
  setErrors: PropTypes.func,
  className: PropTypes.string,
}

ConnectProfilesItem.defaultProps = {
  setSelectedProfile: () => {},
  setIsConnecting: () => {},
  setErrors: () => {},
  className: null,
}

export default ConnectProfilesItem

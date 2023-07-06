import React from 'react'
import useAsyncEffect from 'use-async-effect'
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import Spinner from '@/elements/Spinner'
import ConnectProfilesIsConnecting from '@/app/elements/connectProfiles/ConnectProfilesIsConnecting'
import ConnectProfilesList, { Business, ArtistAccount } from '@/app/elements/connectProfiles/ConnectProfilesList'
import ConnectProfilesConnectMore from '@/app/elements/connectProfiles/ConnectProfilesConnectMore'
import ConnectProfilesButtonHelp from '@/app/elements/connectProfiles/ConnectProfilesButtonHelp'
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import useBillingStore from '@/app/stores/billingStore'
import { Nullable } from 'shared/types/common'


const getBillingStoreState = (state) => ({
  hasManagedArtist: state.hasManagedArtist,
})

interface ConnectProfilesLoaderProps {
  isConnecting: boolean,
  setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>,
  className: string,
}

const ConnectProfilesLoader: React.FC<ConnectProfilesLoaderProps> = ({
  isConnecting,
  setIsConnecting,
  className,
}) => {
  const [allArtistAccounts, setAllArtistAccounts] = React.useState<ArtistAccount[]>([])
  const [artistAccounts, setArtistAccounts] = React.useState<ArtistAccount[]>([])
  const [businesses, setBusinesses] = React.useState<Business[]>([])
  const [selectedProfile, setSelectedProfile] = React.useState(null)
  const [selectedBusiness, setSelectedBusiness] = React.useState<Nullable<Business>>(null)
  const [pageLoading, setPageLoading] = React.useState<boolean>(true)
  const [errors, setErrors] = React.useState([])
  const [isCannotListPagesError, setIsCannotListPagesError] = React.useState(false)
  const { hasManagedArtist } = useBillingStore(getBillingStoreState)

  const {
    auth,
    authError,
    setAuthError,
    setIsPlatformRedirect,
  } = React.useContext(AuthContext)

  const { user, userLoading } = React.useContext(UserContext)

  const { missingScopes: { ads: missingScopes } } = auth

  React.useEffect(() => {
    if (authError) {
      setErrors([authError])
    }
  }, [authError])

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
      setIsPlatformRedirect(false)
    }
  }, [setAuthError, authError, setIsPlatformRedirect])


  // Get initial data from server
  useAsyncEffect(async (isMounted) => {
    // Stop here if user is loading or profiles are being connected
    if (userLoading || isConnecting) return

    // If missing scopes, we need to show the connect button
    if (missingScopes.length) return setPageLoading(false)

    // Stop here if we haven't either auth or fb auth errors
    if (errors.length) return setPageLoading(false)

    // Start fetching artists
    const { res: businesses } = await artistHelpers.getBusinesses()
    let firstBusiness: Business
    if (businesses && businesses.length) {
      [firstBusiness] = businesses
      setBusinesses(businesses)
      setSelectedBusiness(firstBusiness)
    }
    // TODO 1 : If there are multiple businesses, show menu to switch between them.
    //  Make sure no businesses doesn't cause an error.
    const { res, error } = await artistHelpers.getArtistOnSignUp(firstBusiness.id)

    if (error) {
      if (! isMounted()) return

      if (error.message === 'user cache is not available') {
        setPageLoading(false)
        return
      }

      if (error.message === 'cannot list facebook pages') {
        setIsCannotListPagesError(true)
        setPageLoading(false)
        return
      }

      setErrors([...errors, error])
      setPageLoading(false)
      return
    }

    const { accounts: artistAccounts } = res

    // Error if no artist accounts
    if (Object.keys(artistAccounts).length === 0) {
      setErrors([...errors, { message: 'No accounts were found' }])
      setPageLoading(false)

      // Track
      fireSentryError({
        category: 'sign up',
        action: 'No Facebook Pages were found after running artistHelpers.getArtistOnSignUp()',
      })
    }

    setAllArtistAccounts(Object.values(artistAccounts).map((artist) => artist))

    // Remove profiles that have already been connected
    const userArtists = user?.artists || []
    const artistsFiltered = ! user.artists.length ? artistAccounts : artistHelpers.removeAlreadyConnectedArtists(artistAccounts, userArtists)

    // Add ad accounts to artists
    const processedArtists = artistHelpers.processArtists(artistsFiltered, firstBusiness.id)

    if (! isMounted()) return

    setArtistAccounts(processedArtists)

    setPageLoading(false)
  }, [userLoading, isConnecting])

  if (isConnecting && artistAccounts.length > 0) {
    return <ConnectProfilesIsConnecting profile={selectedProfile} />
  }

  if (pageLoading || isConnecting) return <Spinner />

  return (
    <div className={className}>
      <div className="col-span-12 sm:col-span-6">
        <ConnectProfilesList
          allArtistAccounts={allArtistAccounts}
          artistAccounts={artistAccounts}
          selectedBusiness={selectedBusiness}
          setSelectedProfile={setSelectedProfile}
          setIsConnecting={setIsConnecting}
          setErrors={setErrors}
        />
        <ConnectProfilesButtonHelp
          auth={auth}
          errors={errors}
          setErrors={setErrors}
          isConnecting={isConnecting}
        />
      </div>
      <div
        className={[
          'col-span-12 sm:col-span-6',
          ! isCannotListPagesError ? 'hidden sm:block' : null,
        ].join(' ')}
      >
        <ConnectProfilesConnectMore
          auth={auth}
          errors={errors}
          setErrors={setErrors}
          hasArtists={artistAccounts.length > 0}
          setSelectedProfile={setSelectedProfile}
          setIsConnecting={setIsConnecting}
          isCannotListPagesError={isCannotListPagesError}
        />
      </div>
    </div>
  )
}

export default ConnectProfilesLoader

import React, { Dispatch, SetStateAction } from 'react'
import useAsyncEffect from 'use-async-effect'
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import Spinner from '@/elements/Spinner'
import ConnectProfilesList, { Business, ArtistAccount } from '@/app/elements/connectProfiles/ConnectProfilesList'
import ConnectProfilesConnectMore from '@/app/elements/connectProfiles/ConnectProfilesConnectMore'
import ConnectProfilesButtonHelp from '@/app/elements/connectProfiles/ConnectProfilesButtonHelp'
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import useBillingStore from '@/app/stores/billingStore'
import { Nullable } from 'shared/types/common'
import ConnectProfilesIsConnecting from '@/app/elements/connectProfiles/ConnectProfilesIsConnecting'
import useDebounce from '../../hooks/useDebounce'


const getBillingStoreState = (state) => ({
  hasManagedArtist: state.hasManagedArtist,
})

interface ConnectProfilesLoaderProps {
  isConnecting: boolean,
  setIsConnecting: Dispatch<SetStateAction<boolean>>,
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
  const [selectedBusiness, setSelectedBusiness] = React.useState<Nullable<Business>>(null)
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [newArtistName, setNewArtistName] = React.useState<Nullable<string>>(null)
  const [pageLoading, setPageLoading] = React.useState<boolean>(true)
  const [availableArtistsLoading, setAvailableArtistsLoading] = React.useState<boolean>(false)
  const [errors, setErrors] = React.useState([])
  const [isCannotListPagesError, setIsCannotListPagesError] = React.useState(false)
  const { hasManagedArtist } = useBillingStore(getBillingStoreState)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

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

    // On first load, get all the businesses a user has access to
    let firstBusiness: Business
    if (businesses.length === 0 && ! selectedBusiness) {
      const { res: availableBusinesses } = await artistHelpers.getBusinesses()
      if (availableBusinesses && availableBusinesses.length) {
        [firstBusiness] = availableBusinesses
        setBusinesses(availableBusinesses)
        setSelectedBusiness(firstBusiness)
      }
    } else {
      firstBusiness = selectedBusiness
    }

    // Start fetching artists
    setAvailableArtistsLoading(true)
    const { res, error } = await artistHelpers.getArtistOnSignUp(firstBusiness?.id, debouncedSearchQuery)

    if (error) {
      if (! isMounted()) return

      if (error.message === 'user cache is not available') {
        setPageLoading(false)
        setAvailableArtistsLoading(false)
        return
      }

      if (error.message === 'cannot list facebook pages') {
        setIsCannotListPagesError(true)
        setPageLoading(false)
        setAvailableArtistsLoading(false)
        return
      }

      setErrors([...errors, error])
      setPageLoading(false)
      setAvailableArtistsLoading(false)
      return
    }

    const { accounts: artistAccounts } = res

    // Error if no artist accounts
    if (Object.keys(artistAccounts).length === 0 && ! searchQuery) {
      setErrors([...errors, { message: 'No accounts were found' }])
      setPageLoading(false)
      setAvailableArtistsLoading(false)

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
    const processedArtists = artistHelpers.processArtists(artistsFiltered, firstBusiness?.id)

    if (! isMounted()) return

    setArtistAccounts(processedArtists)

    setPageLoading(false)
    setAvailableArtistsLoading(false)
  }, [selectedBusiness, debouncedSearchQuery, userLoading, isConnecting])

  if (isConnecting && artistAccounts.length > 0) {
    return <ConnectProfilesIsConnecting profileName={newArtistName} />
  }

  if (pageLoading || isConnecting) return <Spinner />

  return (
    <div className={className}>
      <div className="col-span-12 sm:col-span-6">
        <ConnectProfilesList
          allArtistAccounts={allArtistAccounts}
          artistAccounts={artistAccounts}
          availableArtistsLoading={availableArtistsLoading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          businesses={businesses}
          selectedBusiness={selectedBusiness}
          setSelectedBusiness={setSelectedBusiness}
          setNewArtistName={setNewArtistName}
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
          setIsConnecting={setIsConnecting}
          isCannotListPagesError={isCannotListPagesError}
        />
      </div>
    </div>
  )
}

export default ConnectProfilesLoader

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
import { Nullable } from 'shared/types/common'
import ConnectProfilesIsConnecting from '@/app/elements/connectProfiles/ConnectProfilesIsConnecting'
import useDebounce from '@/app/hooks/useDebounce'

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
  const [isPageLoading, setIsPageLoading] = React.useState<boolean>(true)
  const [isLoadingAvailableArtists, setIsLoadingAvailableArtists] = React.useState<boolean>(false)
  const [errors, setErrors] = React.useState([])
  const [isCannotListPagesError, setIsCannotListPagesError] = React.useState(false)

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
    if (missingScopes.length) return setIsPageLoading(false)

    // Stop here if we haven't either auth or fb auth errors
    if (errors.length) return setIsPageLoading(false)

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
    setIsLoadingAvailableArtists(true)
    const { res, error } = await artistHelpers.getArtistOnSignUp(firstBusiness?.id, debouncedSearchQuery)

    if (error) {
      if (! isMounted()) return

      if (error.message === 'user cache is not available') {
        setIsPageLoading(false)
        setIsLoadingAvailableArtists(false)
        return
      }

      if (error.message === 'cannot list facebook pages') {
        setIsCannotListPagesError(true)
        setIsPageLoading(false)
        setIsLoadingAvailableArtists(false)
        return
      }

      setErrors([...errors, error])
      setIsPageLoading(false)
      setIsLoadingAvailableArtists(false)
      return
    }

    const { accounts: artistAccounts } = res

    // Error if no artist accounts
    if (Object.keys(artistAccounts).length === 0 && ! searchQuery) {
      setErrors([...errors, { message: 'No accounts were found' }])
      setIsPageLoading(false)
      setIsLoadingAvailableArtists(false)

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

    setIsPageLoading(false)
    setIsLoadingAvailableArtists(false)
  }, [selectedBusiness, debouncedSearchQuery, userLoading, isConnecting])

  if (isConnecting && artistAccounts.length > 0) {
    return <ConnectProfilesIsConnecting profileName={newArtistName} />
  }

  if (isPageLoading || isConnecting) return <Spinner />

  return (
    <div className={className}>
      <div className="col-span-12 sm:col-span-6">
        <ConnectProfilesList
          allArtistAccounts={allArtistAccounts}
          artistAccounts={artistAccounts}
          isLoadingAvailableArtists={isLoadingAvailableArtists}
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

import React from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '@/app/contexts/UserContext'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import ProfilesConnectMore from '@/app/ProfilesConnectMore'
import ProfilesListSearch from '@/app/ProfilesListSearch'
import ProfileButton from '@/app/ProfileButton'
import CaretIcon from '@/icons/CaretIcon'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import brandColors from '../../shared/constants/brandColors'

const ProfilesList = ({
  artistsWithNotifications,
  shouldShowMore,
  setShouldShowMore,
  hasConnectMore,
  className,
}) => {
  const { user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const sortedArtists = artistHelpers.sortArtistsAlphabetically(allArtists)

  const [profiles, setProfiles] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const containerRef = React.useRef(null)
  const isDesktopLayout = useBreakpointTest('md')

  const close = ({ target }) => {
    if (! containerRef.current) {
      return
    }

    if (containerRef.current.contains(target)) {
      return
    }

    setShouldShowMore(false)
  }

  React.useEffect(() => {
    if (shouldShowMore) {
      window.addEventListener('click', close)
      return
    }
    window.removeEventListener('click', close)

    return () => {
      window.removeEventListener('click', close)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShowMore])

  React.useEffect(() => {
    setProfiles(sortedArtists.filter((profile) => profile.name.toLowerCase().includes(searchValue.toLowerCase())))
  }, [searchValue, sortedArtists])

  if (! profiles.length && ! searchValue) {
    return
  }

  return (
    <div className={['absolute', className].join(' ')}>
      <CaretIcon
        className={[
          'absolute w-12 h-12',
          isDesktopLayout ? 'top-[134px] -left-[28px]' : '-top-7 right-4',
        ].join(' ')}
        fill={brandColors.black}
        direction={isDesktopLayout ? 'left' : 'up'}
      />
      <div
        className={[
          'w-[200px] py-2',
          'bg-black rounded-dialogue',
        ].join(' ')}
        ref={containerRef}
      >
        {hasConnectMore && (
          <div className="px-4">
            <ProfilesConnectMore className="h-8 mb-2 justify-between" isExpanded />
          </div>
        )}
        <ProfilesListSearch value={searchValue} setValue={setSearchValue} />
        <div
          className={[
            'mt-2',
            'overflow-y-scroll bg-black',
            isDesktopLayout ? 'max-h-[85vh]' : 'max-h-[75vh]',
          ].join(' ')}
        >
          {profiles.map(({ id, name, facebook_page_id }, index) => {
            const hasNotification = artistsWithNotifications.includes(id)
            const isLast = index + 1 === profiles.length

            return (
              <ProfileButton
                key={id}
                name={name}
                pageId={facebook_page_id}
                artistId={id}
                hasNotifications={hasNotification}
                setShouldShowMore={setShouldShowMore}
                isLast={isLast}
                isExpanded
              />
            )
          })}
        </div>
        {searchValue && profiles.length === 0 && (
          <div className="h-12 p-4 text-center text-grey-3">No results</div>
        )}
      </div>
    </div>
  )
}

ProfilesList.propTypes = {
  artistsWithNotifications: PropTypes.array.isRequired,
  shouldShowMore: PropTypes.bool.isRequired,
  setShouldShowMore: PropTypes.func.isRequired,
  hasConnectMore: PropTypes.bool,
  className: PropTypes.string,
}

ProfilesList.defaultProps = {
  hasConnectMore: false,
  className: null,
}

export default ProfilesList

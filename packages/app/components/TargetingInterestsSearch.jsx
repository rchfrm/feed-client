import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import TargetingInterestsSearchResultsItem from '@/app/TargetingInterestsSearchResultsItem'
import TargetingSearchSuccess from '@/app/TargetingLSearchSuccess'
import Search from '@/elements/Search'
import { getInterests } from '@/app/helpers/targetingHelpers'

const TargetingInterestsSearch = ({
  platform,
  interest,
  setInterest,
}) => {
  const [interests, setInterests] = React.useState([])
  const { name } = interest || {}
  const { artistId } = React.useContext(ArtistContext)
  const filteredInterests = interests.filter(({ keyword, status }) => ! keyword || (keyword && status === 'EFFECTIVE'))

  return (
    ! interest ? (
      <>
        <p>Search for interests:</p>
        <Search
          key={platform}
          name="interest"
          onChange={getInterests}
          onClick={setInterest}
          searchResults={filteredInterests}
          setSearchResults={setInterests}
          listItem={TargetingInterestsSearchResultsItem}
          placeholder="Start typing to search..."
          params={[artistId, platform]}
          className="mb-4"
        />
      </>
    ) : (
      <TargetingSearchSuccess
        name={name}
        type="interest"
        setValue={setInterest}
      />
    )
  )
}

TargetingInterestsSearch.propTypes = {
  platform: PropTypes.string.isRequired,
  interest: PropTypes.object,
  setInterest: PropTypes.func.isRequired,
}

TargetingInterestsSearch.defaultProps = {
  interest: null,
}

export default TargetingInterestsSearch

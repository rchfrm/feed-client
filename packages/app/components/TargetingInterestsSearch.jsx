import React from 'react'
import TargetingInterestsSearchResultsItem from '@/app/TargetingInterestsSearchResultsItem'
import TargetingSearchSuccess from '@/app/TargetingLSearchSuccess'
import Search from '@/elements/Search'
import { getInterests } from '@/app/helpers/targetingHelpers'

const TargetingInterestsSearch = () => {
  const [interest, setInterest] = React.useState(null)
  const { name } = interest || {}

  return (
    ! interest ? (
      <>
        <p>Search for interests:</p>
        <Search
          name="interest"
          onChange={getInterests}
          onClick={setInterest}
          listItem={TargetingInterestsSearchResultsItem}
          placeholder="Start typing to search..."
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

export default TargetingInterestsSearch

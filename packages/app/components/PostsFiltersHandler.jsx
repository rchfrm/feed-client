import React from 'react'
import PropTypes from 'prop-types'
import { useImmerReducer } from 'use-immer'
import { useRouter } from 'next/router'

import PostsFiltersContent from '@/app/PostsFiltersContent'

import * as postsHelpers from '@/app/helpers/postsHelpers'
import * as utils from '@/helpers/utils'

const filtersInitialState = {
  promotion_status: [],
  platform: [],
  internal_type: [],
  promotion_enabled: [],
}

const filtersReducer = (draftState, filtersAction) => {
  const { type: actionType, payload = {} } = filtersAction
  const {
    filters,
    filterType,
    filterValue,
  } = payload
  switch (actionType) {
    case 'set-filters':
      return { ...draftState, ...filters }
    case 'add-filter':
      draftState[filterType].push(filterValue)
      break
    case 'remove-filter':
      draftState[filterType] = draftState[filterType].filter((filter) => filter !== filterValue)
      break
    case 'reset-filters':
      draftState[filterType] = filtersInitialState[filterType]
      break
    default:
      return draftState
  }
}

const PostsFiltersHandler = ({ setFilterBy, disabled, className }) => {
  const [filters, setFilters] = useImmerReducer(filtersReducer, filtersInitialState)
  const [shouldUpdateQueryString, setShouldUpdateQueryString] = React.useState(false)

  const router = useRouter()

  const setQueryString = React.useCallback((filters) => {
    const { query: currentQueries } = utils.parseUrl(window.location.href)
    const newQueries = {
      ...currentQueries,
      ...filters,
    }

    router.replace({
      pathname: router.pathname,
      query: newQueries,
    })

    utils.setLocalStorage('filterBy', JSON.stringify(filters))
    setFilterBy(filters)
  }, [router, setFilterBy])

  // On mount set filters based on query string and local storage
  React.useEffect(() => {
    // Filter out non filter related queries
    const filteredFilterQuery = Object.fromEntries(Object.entries(router.query).filter(([key]) => postsHelpers.filters.includes(key)))
    const currentFilterQuery = Object.keys(filteredFilterQuery).length ? filteredFilterQuery : null
    const currentFilterStorage = JSON.parse(utils.getLocalStorage('filterBy'))
    const storedFilter = currentFilterQuery || currentFilterStorage

    if (!storedFilter) return

    const formattedFilters = Object.entries(storedFilter).reduce((result, [key, value]) => {
      // If filter value is not an array yet, push the value into an array
      const filterValues = Array.isArray(value) ? value : [value]

      return {
        ...result,
        // Check and convert boolean string values to boolean values if needed
        [key]: filterValues.map((filterValue) => utils.checkAndConvertBooleanString(filterValue)),
      }
    }, {})

    // Update filters state
    setFilters({
      type: 'set-filters',
      payload: {
        filters: formattedFilters,
      },
    })
    setQueryString(formattedFilters)
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (shouldUpdateQueryString) {
      setQueryString(filters)
      setShouldUpdateQueryString(false)
    }
  }, [shouldUpdateQueryString, setQueryString, filters])

  return (
    <div className={[
      className,
      disabled ? 'opacity-50 pointer-events-none' : null,
    ].join(' ')}
    >
      <PostsFiltersContent
        filters={filters}
        setFilters={setFilters}
        setShouldUpdateQueryString={setShouldUpdateQueryString}
      />
    </div>
  )
}

PostsFiltersHandler.propTypes = {
  setFilterBy: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostsFiltersHandler.defaultProps = {
  className: null,
}

export default PostsFiltersHandler

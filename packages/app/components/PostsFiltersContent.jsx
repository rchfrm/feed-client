import React from 'react'
import PropTypes from 'prop-types'
import { useImmerReducer } from 'use-immer'
import { useRouter } from 'next/router'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsFilters from '@/app/PostsFilters'

import Button from '@/elements/Button'
import PlusIcon from '@/icons/PlusIcon'
import ButtonPill from '@/elements/ButtonPill'

import * as postsHelpers from '@/app/helpers/postsHelpers'
import * as utils from '@/helpers/utils'

import brandColors from '@/constants/brandColors'

const filtersInitialState = {
  promotionStatus: [],
  platform: [],
  postType: [],
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

const PostsFiltersContent = ({ setFilterBy, className }) => {
  const [filters, setFilters] = useImmerReducer(filtersReducer, filtersInitialState)
  const [shouldUpdateQueryString, setShouldUpdateQueryString] = React.useState(false)
  const {
    setSidePanelContent,
    setSidePanelButton,
    setSidePanelContentLabel,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

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

  const onClick = () => {
    setShouldUpdateQueryString(true)
    toggleSidePanel(false)
  }

  // On mount set filters based on query string and local storage
  React.useEffect(() => {
    // Filter out non filter related queries
    const filteredFilterQuery = Object.fromEntries(Object.entries(router.query).filter(([key]) => postsHelpers.filters.includes(key)))
    const currentFilterQuery = Object.keys(filteredFilterQuery).length ? filteredFilterQuery : null
    const currentFilterStorage = JSON.parse(utils.getLocalStorage('filterBy'))
    const storedFilter = currentFilterQuery || currentFilterStorage

    if (!storedFilter) return

    const formattedFilters = Object.entries(storedFilter).reduce((result, [key, values]) => {
      return {
        ...result,
        // If filter value is not an array yet, push the value into an array
        [key]: Array.isArray(values) ? values : [values],
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

  const CLOSE_BUTTON = (
    <Button
      onClick={onClick}
      version="green"
      className="border-solid border-0 border-t-4"
      trackComponentName="PostsFilters"
    >
      Filter
    </Button>
  )

  const goToPostsFiltersMenu = () => {
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContentLabel('Posts Filters')
    setSidePanelContent(<PostsFilters initialFilters={filters} setFiltersState={setFilters} />)
    toggleSidePanel(true)
  }

  return (
    <div className={className}>
      <p className="font-bold text-base">Filter</p>
      <div className="flex flex-wrap border-solid border-0 border-t-2 pt-5">
        {Object.entries(filters).map(([key, value], index) => {
          if (!value.length) return

          const filter = postsHelpers.filterTypes[index]
          const filterName = filter.title
          const isMultipleFilters = value.length > 1
          const filterValue = isMultipleFilters ? value.length : filter.options.find((option) => option.slug === value[0]).title

          return (
            <ButtonPill
              key={key}
              onClick={goToPostsFiltersMenu}
              className="mr-4 mb-4"
              trackComponentName="PostsFilters"
            >
              {filterName}:
              <span
                className={['ml-1 leading-3', isMultipleFilters ? 'bg-black text-white' : null].join(' ')}
                style={{ padding: '2px' }}
              >
                {filterValue}
              </span>
            </ButtonPill>
          )
        })}
        <button
          className="flex justify-center items-center h-10 w-10 bg-black rounded-full"
          onClick={goToPostsFiltersMenu}
        >
          <PlusIcon style={{ height: '1rem' }} fill={brandColors.white} />
        </button>
      </div>
    </div>
  )
}

PostsFiltersContent.propTypes = {
  className: PropTypes.string,
}

PostsFiltersContent.defaultProps = {
  className: null,
}

export default PostsFiltersContent

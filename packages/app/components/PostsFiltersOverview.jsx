import React from 'react'
import PropTypes from 'prop-types'
import { useImmerReducer } from 'use-immer'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsFilters from '@/app/PostsFilters'

import Button from '@/elements/Button'
import PlusIcon from '@/icons/PlusIcon'
import ButtonPill from '@/elements/ButtonPill'

import brandColors from '@/constants/brandColors'

const filtersInitialState = {
  status: [],
  platform: [],
  postType: [],
}

const filtersReducer = (draftState, filtersAction) => {
  const { type: actionType, payload = {} } = filtersAction
  const {
    filterType,
    filterValue,
  } = payload
  switch (actionType) {
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

const PostsFiltersOverview = ({ className }) => {
  const [filters, setFilters] = useImmerReducer(filtersReducer, filtersInitialState)
  const {
    setSidePanelContent,
    setSidePanelButton,
    setSidePanelContentLabel,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  React.useEffect(() => {
    console.log(filters)
  }, [filters])

  const CLOSE_BUTTON = (
    <Button
      onClick={() => toggleSidePanel(false)}
      version="green"
      className="border-solid border-0 border-t-4"
      trackComponentName="PostsFilters"
    >
      Close
    </Button>
  )

  const goToPostsFiltersMenu = () => {
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContentLabel('Posts Filters')
    setSidePanelContent(<PostsFilters filters={filters} setFilters={setFilters} />)
    toggleSidePanel(true)
  }

  return (
    <div className={className}>
      <p className="font-bold text-base">Filter</p>
      <div className="flex border-solid border-0 border-t-2 pt-5">
        {Object.entries(filters).map(([key, value]) => {
          if (!value.length) return

          return (
            <ButtonPill
              key={key}
              onClick={goToPostsFiltersMenu}
              className={['mr-4'].join(' ')}
              trackComponentName="PostsFilters"
            >
              {key}: {value.length > 1 ? value.length : value[0]}
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

PostsFiltersOverview.propTypes = {
  className: PropTypes.string,
}

PostsFiltersOverview.defaultProps = {
  className: null,
}

export default PostsFiltersOverview

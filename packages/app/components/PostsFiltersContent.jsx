import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsFilters from '@/app/PostsFilters'

import Button from '@/elements/Button'
import PlusIcon from '@/icons/PlusIcon'
import ButtonPill from '@/elements/ButtonPill'

import * as postsHelpers from '@/app/helpers/postsHelpers'

import brandColors from '@/constants/brandColors'

const PostsFiltersContent = ({
  filters,
  setFilters,
  setShouldUpdateQueryString,
}) => {
  const hasMultipleFiltersApplied = Object.values(filters).reduce((result, filterArray) => result + filterArray.length, 0) > 1

  const {
    setSidePanelContent,
    setSidePanelButton,
    setSidePanelContentLabel,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  const onClick = React.useCallback(() => {
    setShouldUpdateQueryString(true)
    toggleSidePanel(false)
  }, [setShouldUpdateQueryString, toggleSidePanel])

  const CLOSE_BUTTON = React.useMemo(() => (
    <Button
      onClick={onClick}
      version="green"
      className="border-solid border-0 border-t-4"
      trackComponentName="PostsFilters"
    >
      {`Apply filter${hasMultipleFiltersApplied ? 's' : ''}`}
    </Button>
  ), [hasMultipleFiltersApplied, onClick])

  const goToPostsFiltersMenu = () => {
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContentLabel('Posts Filters')
    setSidePanelContent(<PostsFilters initialFilters={filters} setFiltersState={setFilters} />)
    toggleSidePanel(true)
  }

  React.useEffect(() => {
    setSidePanelButton(CLOSE_BUTTON)
  }, [hasMultipleFiltersApplied, CLOSE_BUTTON, setSidePanelButton])

  return (
    <div>
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
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  setShouldUpdateQueryString: PropTypes.func.isRequired,
}

PostsFiltersContent.defaultProps = {
}

export default PostsFiltersContent

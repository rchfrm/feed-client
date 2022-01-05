import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsFilters from '@/app/PostsFilters'

import Button from '@/elements/Button'
import PlusIcon from '@/icons/PlusIcon'
import ButtonPill from '@/elements/ButtonPill'

import brandColors from '@/constants/brandColors'

const PostsFiltersOverview = ({ className }) => {
  const {
    setSidePanelContent,
    setSidePanelButton,
    setSidePanelContentLabel,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

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
    setSidePanelContent(<PostsFilters />)
    toggleSidePanel(true)
  }

  return (
    <div className={className}>
      <p className="font-bold text-base">Filter</p>
      <div className="flex border-solid border-0 border-t-2 pt-5">
        <ButtonPill
          onClick={() => console.log('nope')}
          className={['mr-4'].join(' ')}
          trackComponentName="PostsFilters"
        >
          Status: Running
        </ButtonPill>
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

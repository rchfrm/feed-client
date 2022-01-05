import React from 'react'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsFiltersOptions from '@/app/PostsFiltersOptions'

import Button from '@/elements/Button'
import PlusIcon from '@/icons/PlusIcon'

import brandColors from '@/constants/brandColors'

const PostsFilters = () => {
  const {
    setSidePanelContent,
    setSidePanelButton,
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
    setSidePanelContent(<PostsFiltersOptions />)
    toggleSidePanel(true)
  }

  return (
    <div className="col-span-12 sm:col-span-8">
      <p className="font-bold text-base">Filter</p>
      <div className="border-solid border-0 border-t-2 pt-5">
        <button
          className="flex justify-center items-center h-10 w-10 bg-black rounded-full"
          onClick={goToPostsFiltersMenu}
          trackComponentName="LinkBankListButtons"
        >
          <PlusIcon style={{ height: '1rem' }} fill={brandColors.white} />
        </button>
      </div>
    </div>
  )
}

PostsFilters.propTypes = {
}

PostsFilters.defaultProps = {
}

export default PostsFilters

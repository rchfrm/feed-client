import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import LockIcon from '@/icons/LockIcon'
import Button from '@/elements/Button'
import { postsConfig } from '@/app/helpers/postsHelpers'
import brandColors from '@/constants/brandColors'
import * as ROUTES from '@/app/constants/routes'

const PostsNoArtistsContainer = ({
  status,
  isOpen,
  className,
}) => {
  const isActive = status === 'active'
  const shouldShowPostsAmount = isActive || status === 'rejected'

  const goToGetStartedPage = () => {
    Router.push({
      pathname: ROUTES.GET_STARTED,
    })
  }

  return (
    <div
      className={[
        'mb-5 rounded-dialogue border-2 border-solid',
        ! isOpen ? 'overflow-hidden h-[70px]' : null,
        className,
      ].join(' ')}
    >
      <div
        className={[
          'w-full flex justify-between items-center p-5',
          isOpen ? 'rounded-b-none' : null,
        ].join(' ')}
      >
        <h2 className={['mb-0 mr-5', isActive ? 'text-grey-dark' : 'text-black'].join(' ')}>{shouldShowPostsAmount ? 0 : null} {postsConfig[status].name}</h2>
      </div>
      <div className="mb-5 px-5 transition ease-in-out delay-200 transition-opacity opacity-1">
        <div className="flex items-center mb-5">
          <LockIcon className="w-4 h-auto mr-2 md:mr-1 flex-shrink-0" fill={brandColors.red} />
          <p className="mb-0">
            {isActive ? 'Your active ads will appear here. ' : "You'll find the ads Feed has lined up to promote here. "}
            <Button version="text" className="decoration-green" onClick={goToGetStartedPage}> Continue set up</Button>
            {isActive ? ' to start your first campaign. ' : ' to start adding to the queue.'}
          </p>
        </div>
        <ul className="grid grid-cols-12 gap-6 grid-flow-row-dense mb-0">
          {[...Array(4)].map((index) => {
            return (
              <div
                key={index}
                className="w-full relative opacity-1 mb-2 col-span-6 sm:col-span-3 lg:col-span-2"
                style={{ paddingTop: '100%' }}
              >
                <div className={[
                  'absolute w-full h-full top-0',
                  status === 'pending' ? 'bg-grey' : 'bg-grey-light',
                ].join(' ')}
                />
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

PostsNoArtistsContainer.propTypes = {
  status: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostsNoArtistsContainer.defaultProps = {
  className: null,
}

export default PostsNoArtistsContainer

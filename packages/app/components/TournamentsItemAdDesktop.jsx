import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'
import PostImage from '@/PostImage'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAdDesktop = ({ adPost, title, winner, secondary, streakWinner }) => {
  const { postLink, thumbnailOptions, message, score, streak } = adPost
  const linkIcon = <LinkIcon className="h-3 mr-2" />
  const titleClass = 'inline-flex items-baseline whitespace-no-wrap'
  return (
    <div className="flex">
      {/* Title & link */}
      <p className="flex-1 text-left sm:pr-12 mb-0 w-20 xxs:w-24">
        {postLink ? (
          <a className={titleClass} href={postLink} target="_blank" rel="noopener noreferrer">
            {linkIcon}
            {title}
          </a>
        ) : (
          <span className={titleClass}>
            <span style={{ visibility: 'hidden' }}>{linkIcon}</span>
            {title}
          </span>
        )}
      </p>
      {/* Post image */}
      <div className="w-24">
        <PostImage
          thumbnailOptions={thumbnailOptions}
          title={message}
        />
      </div>
    </div>
  )
}

TournamentsItemAdDesktop.propTypes = {
  adPost: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  winner: PropTypes.bool,
  secondary: PropTypes.bool,
  streakWinner: PropTypes.bool.isRequired,
}

TournamentsItemAdDesktop.defaultProps = {
  winner: false,
  secondary: false,
}

export default TournamentsItemAdDesktop

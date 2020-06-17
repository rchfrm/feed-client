import React from 'react'
import PropTypes from 'prop-types'

// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/Artist'

import PostLinkOptions from '@/PostLinkOptionsNew'
import PostLinkAddUrl from '@/PostLinkAddUrl'

import LinkIcon from '@/icons/LinkIcon'

import * as utils from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

import styles from '@/PostItem.module.css'

const PostLink = ({ postId, postIndex, priorityDsp, updateLink, setError }) => {
  const { artist } = React.useContext(ArtistContext)
  const [postLinkPlatform, setPostLinkPlatform] = React.useState(priorityDsp || artist.priority_dsp)
  const postLinkKey = utils.convertPlatformToPriorityDSP(postLinkPlatform)
  const postLinkUrl = artist[postLinkKey]
  // SHOULD THE ADD URL 'ALERT' BE SHOWN
  const [addUrl, setAddUrl] = React.useState(false)

  return (
    <div className={[styles.postLink, styles.postSection].join(' ')}>
      <div className={styles.postLinkTopBar}>
        <p>
          Post links to
          {' '}
          <a
            href={postLinkUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.postLinkAnchor}
          >
            <LinkIcon fill={brandColors.bgColor} />
            {postLinkPlatform}
          </a>
        </p>
        <p>
          <a role="button" className={styles.postLinkEditButton}>edit</a>
        </p>
      </div>
      {/* Link change content */}
      <div className={styles.postLinkContent}>
        <PostLinkOptions
          postId={postId}
          postIndex={postIndex}
          postLinkPlatform={postLinkPlatform}
          setPostLinkPlatform={setPostLinkPlatform}
          setAddUrl={setAddUrl}
          setError={setError}
        />

        {/* Show add URL dialogue if triggered */}
        {addUrl && (
          <PostLinkAddUrl
            setError={setError}
            postId={postId}
            postIndex={postIndex}
            postLinkPlatform={postLinkPlatform}
            setPostLinkPlatform={setPostLinkPlatform}
            setAddUrl={setAddUrl}
            updateLink={updateLink}
          />
        )}
      </div>

    </div>
  )
}

PostLink.propTypes = {
  postId: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
  priorityDsp: PropTypes.string.isRequired,
  updateLink: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default PostLink

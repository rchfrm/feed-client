import React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

import LinkIcon from '@/icons/LinkIcon'

import styles from '@/app/PostItem.module.css'

const PostLinkSummary = ({
  loading,
  linkPanelOpen,
  isAnimating,
  postLinkPlatform,
  postLinkUrl,
}) => {
  return (
    <div className={styles.postLinkSummary}>
      <LinkIcon fill={brandColors.bgColor} className={styles.postLinkIcon} />
      Post links to
      <SwitchTransition>
        <CSSTransition
          key={linkPanelOpen}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          classNames="fade"
        >
          <div>
            {loading || linkPanelOpen || isAnimating ? (
              <span className={styles.postLinkEllipsis}>...</span>
            ) : (
              <>
                {' '}
                <a
                  href={postLinkUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.postLinkAnchor}
                >
                  {postLinkPlatform}
                </a>
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

PostLinkSummary.propTypes = {
  loading: PropTypes.bool.isRequired,
  linkPanelOpen: PropTypes.bool.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  postLinkPlatform: PropTypes.string.isRequired,
  postLinkUrl: PropTypes.string.isRequired,
}

export default PostLinkSummary

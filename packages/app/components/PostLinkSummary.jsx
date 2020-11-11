import React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'

import linksStore from '@/app/store/linksStore'

import styles from '@/app/PostItem.module.css'

import { getLinkById } from '@/app/helpers/linksHelpers'

import brandColors from '@/constants/brandColors'

const PostLinkSummary = ({
  linkPanelOpen,
  isAnimating,
  currentLinkId,
}) => {
  // GET FULL INFO ABOUT CURRENT LINK
  const nestedLinks = linksStore(state => state.nestedLinks)
  const defaultLink = linksStore(state => state.defaultLink)
  const currentLink = React.useMemo(() => {
    return currentLinkId ? getLinkById(nestedLinks, currentLinkId) : defaultLink
  }, [currentLinkId, defaultLink, nestedLinks])
  const { href: postLinkUrl, name: postLinkName } = currentLink || {}

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
            {linkPanelOpen || isAnimating ? (
              <span className={styles.postLinkEllipsis}>...</span>
            ) : (
              <>
                {' '}
                {postLinkUrl ? (
                  <a
                    href={postLinkUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.postLinkAnchor}
                  >
                    {postLinkName}
                  </a>
                ) : (
                  <span>{postLinkName}</span>
                )}
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

PostLinkSummary.propTypes = {
  linkPanelOpen: PropTypes.bool.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  currentLinkId: PropTypes.string,
}

PostLinkSummary.defaultProps = {
  currentLinkId: '',
}


export default PostLinkSummary

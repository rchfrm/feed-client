import React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'

import linksStore from '@/app/store/linksStore'

import styles from '@/app/PostItem.module.css'

import { getLinkById } from '@/app/helpers/linksHelpers'
import { removeProtocolFromUrl } from '@/helpers/utils'

import brandColors from '@/constants/brandColors'

const nestedLinksState = (state) => state.nestedLinks
const defaultLinkState = (state) => state.defaultLink

const PostLinkSummary = ({
  linkPanelOpen,
  isAnimating,
  linkId,
  linkHref,
  linkType,
  className,
}) => {
  // GET FULL INFO ABOUT CURRENT LINK
  const nestedLinks = linksStore(nestedLinksState)
  const defaultLink = linksStore(defaultLinkState)
  const currentLink = React.useMemo(() => {
    if (linkType === 'adcreative') {
      return { href: linkHref, name: removeProtocolFromUrl(linkHref) }
    }
    return linkId ? getLinkById(nestedLinks, linkId) : defaultLink
  }, [linkId, defaultLink, nestedLinks, linkType, linkHref])
  const { href: postLinkUrl, name: postLinkName } = currentLink || {}

  return (
    <div
      className={[
        styles.postLinkSummary,
        'w-full whitespace-no-wrap',
        className,
      ].join(' ')}
    >
      <p className="mb-0 ">
        <LinkIcon fill={brandColors.bgColor} className={styles.postLinkIcon} />
        Post links to
      </p>
      <SwitchTransition>
        <CSSTransition
          key={linkPanelOpen}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          classNames="fade"
        >
          <div className="truncate">
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
                    className={[
                      styles.postLinkAnchor,
                      linkType === 'adcreative' ? styles._longLink : null,
                    ].join(' ')}
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
  linkId: PropTypes.string,
  linkHref: PropTypes.string,
  linkType: PropTypes.string,
  className: PropTypes.string,
}

PostLinkSummary.defaultProps = {
  linkId: '',
  linkHref: '',
  linkType: '',
  className: '',
}


export default PostLinkSummary

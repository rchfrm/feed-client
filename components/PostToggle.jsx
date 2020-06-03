// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT ELEMENTS
import ButtonToggle from './elements/ButtonToggle'
import Icon from './elements/Icon'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColors from '../constants/brandColors'
// IMPORT STYLES
import styles from './PostsPage.module.css'

const PostToggle = ({
  post,
  promotionEnabled,
  togglePromotion,
}) => {
  // Alter appearance based on promotion status
  const appearance = {
    platformIconColor: promotionEnabled ? brandColors[post.platform].bg : brandColors.grey,
    toggleIcon: promotionEnabled ? 'tick' : 'empty',
    toggleIconColor: promotionEnabled ? brandColors.white : brandColors.grey,
  }

  const [buttonState, setButtonState] = React.useState(promotionEnabled ? 'on' : 'off')

  const handleClick = async () => {
    setButtonState('loading')
    const newPromtionState = await togglePromotion(post.id)
    setButtonState(newPromtionState ? 'on' : 'off')
  }

  // Change button state when post status changes
  React.useEffect(() => {
    setButtonState(promotionEnabled ? 'on' : 'off')
  }, [promotionEnabled])

  return (
    <div
      className={styles.permalinkAndToggle}
      style={{ padding: '1.5em' }}
    >

      {/* Display platform icon, publish date and time, linking to post permalink */}
      <div className={styles['post-meta']}>

        <Icon
          version={post.platform}
          color={appearance.platformIconColor}
          width="20"
        />
        <a
          className={[styles.a, styles.postDate].join(' ')}
          href={post.permalink_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {moment(post.published_time).format('D MMM YYYY [at] HH[:]mm')}
        </a>

      </div>

      {/* Display toggle option for posts */}
      <ButtonToggle
        onClick={handleClick}
        state={buttonState}
      />

    </div>
  )
}

export default PostToggle

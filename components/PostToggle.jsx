// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT ELEMENTS
import ButtonToggle from './elements/ButtonToggle'
import Icon from './elements/Icon'
// IMPORT ASSETS
// IMPORT CONSTANTS
import dataSourceDetails from '../constants/dataSources'
import brandColors from '../constants/brandColors'
// IMPORT STYLES
import styles from './PostsPage.module.css'

const PostToggle = ({
  post,
  togglePromotion,
}) => {
  // Alter appearance based on promotion status
  const { promotion_enabled } = post
  const appearance = {
    platformIconColor: promotion_enabled ? dataSourceDetails[post.platform].color : brandColors.grey,
    toggleIcon: promotion_enabled ? 'tick' : 'empty',
    toggleIconColor: promotion_enabled ? brandColors.white : brandColors.grey,
  }

  const [buttonState, setButtonState] = React.useState(promotion_enabled ? 'on' : 'off')

  const handleClick = async () => {
    setButtonState('loading')
    const newPromtionState = await togglePromotion(post.id)
    setButtonState(newPromtionState ? 'on' : 'off')
  }

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
          className={styles.a}
          href={post.permalink_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {moment(post.published_time).format('D MMM YYYY [at] HH[:]mm')}
        </a>

      </div>

      {/* Display toggle option for posts */}
      <div className={styles['post-toggle']}>
        <ButtonToggle
          onClick={handleClick}
          state={buttonState}
        />
      </div>

    </div>
  )
}

export default PostToggle

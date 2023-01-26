import React from 'react'
import PropTypes from 'prop-types'
import PlayIcon from '@/icons/PlayIcon'
import PauseIcon from '@/icons/PauseIcon'
import ClockIcon from '@/icons/ClockIcon'
import QueueIcon from '@/icons/QueueIcon'
import QueueAltIcon from '@/icons/QueueAltIcon'
import ExclamationCircleIcon from '@/icons/ExclamationCircleIcon'
import * as postsHelpers from '@/app/helpers/postsHelpers'
import brandColors from '@/constants/brandColors'

const PostPromotionStatus = ({
  promotionEnabled,
  promotionStatus,
  postPromotable,
  size,
  className,
}) => {
  const { active, inReview, inActive, rejected, notRun } = postsHelpers.promotionStatusSlugs
  const [title, setTitle] = React.useState('')
  const [status, setStatus] = React.useState(active)
  const isSmallSize = size === 'small'

  React.useEffect(() => {
    if (! promotionEnabled || ! postPromotable) {
      setStatus('disabled')
      setTitle('Disabled')
      return
    }

    setStatus(promotionStatus)
    setTitle(postsHelpers.promotionStatus.find((status) => status.slug === promotionStatus)?.title)
  }, [promotionEnabled, promotionStatus, postPromotable])

  const getColor = (status) => {
    if (status === active) return 'green'
    if (status === inReview) return 'blue'
    if (status === inActive) return 'yellow'
    if (status === rejected) return 'red'
    if (status === notRun) return 'greyDark'

    return 'greyDark'
  }

  const color = getColor(status)

  const icons = {
    [active]: PlayIcon,
    [notRun]: QueueIcon,
    [inReview]: ClockIcon,
    [inActive]: PauseIcon,
    [rejected]: ExclamationCircleIcon,
    disabled: QueueAltIcon,
  }

  const Icon = icons[status]

  return (
    <div
      className={[
        'flex items-center',
        isSmallSize ? 'h-4' : 'h-8',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'inline-flex items-center',
          'border-2 border-solid rounded-full',
          'mb-0',
          isSmallSize ? 'text-xs' : null,
          ! promotionEnabled ? 'text-grey-dark bg-grey' : 'bg-offwhite',
        ].join(' ')}
        style={{
          borderColor: promotionEnabled ? brandColors[color] : brandColors.grey,
          padding: isSmallSize ? '2px 8px' : '4px 12px',
        }}
      >
        <Icon
          className={[
            'w-auto mr-1',
            isSmallSize ? 'h-4' : 'h-5',
          ].join(' ')}
          color={brandColors[color]}
          secondaryColor={brandColors.grey}
        />
        {title}
      </div>
    </div>
  )
}

PostPromotionStatus.propTypes = {
  promotionEnabled: PropTypes.bool.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  postPromotable: PropTypes.bool.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
}

PostPromotionStatus.defaultProps = {
  size: 'regular',
  className: null,
}

export default PostPromotionStatus

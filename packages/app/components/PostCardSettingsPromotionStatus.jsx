import React from 'react'
import PropTypes from 'prop-types'

import PlayIcon from '@/icons/PlayIcon'
import PauseIcon from '@/icons/PauseIcon'
import ClockIcon from '@/icons/ClockIcon'
import QueueIcon from '@/icons/QueueIcon'
import DoubleExclamationCircleIcon from '@/icons/DoubleExclamationCircleIcon'

import * as postsHelpers from '@/app/helpers/postsHelpers'

import brandColors from '@/constants/brandColors'

const PostCardSettingsPromotionStatus = ({
  promotionEnabled,
  promotionStatus,
}) => {
  const [title, setTitle] = React.useState('')
  const [status, setStatus] = React.useState('')
  const { active, inReview, inActive, rejected, notRun } = postsHelpers.promotionStatusSlugs

  React.useEffect(() => {
    if (!promotionEnabled) {
      setStatus('disabled')
      setTitle('Disabled')
      return
    }

    setStatus(promotionStatus)
    setTitle(postsHelpers.promotionStatus.find((status) => status.slug === promotionStatus)?.title)
  }, [promotionEnabled, promotionStatus])

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
    [rejected]: DoubleExclamationCircleIcon,
    disabled: QueueIcon,
  }

  const Icon = icons[promotionStatus]

  return (
    <div className="flex flex-column w-1/2">
      <h3 className="font-bold text-lg">Status</h3>
      <div
        className={[
          'flex items-center',
          'h-8 mb-10',
        ].join(' ')}
      >
        <div
          className={[
            'inline-flex items-center',
            'rounded-full',
            'mb-0 px-3 py-1',
            !promotionEnabled ? 'text-grey-3 bg-grey-2' : 'border-2 border-solid',
          ].join(' ')}
          style={{ borderColor: brandColors[color] }}
        >
          <Icon className="h-4 w-auto mr-1" color={brandColors[color]} />
          {title}
        </div>
      </div>
    </div>
  )
}

PostCardSettingsPromotionStatus.propTypes = {
  promotionEnabled: PropTypes.bool.isRequired,
  promotionStatus: PropTypes.string.isRequired,
}

PostCardSettingsPromotionStatus.defaultProps = {
}

export default PostCardSettingsPromotionStatus

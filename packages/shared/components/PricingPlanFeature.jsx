import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import TickIcon from '@/icons/TickIcon'
import brandColors from '@/constants/brandColors'

export default function PricingPlanFeature({ feature }) {
  return (
    <div
      className={['flex', 'items-center', 'pb-5'].join(' ')}
    >
      <TickIcon
        className={['h-4', 'w-auto', 'pr-2', 'shrink-0'].join(' ')}
        fill={brandColors.twitter.bg}
      />
      <MarkdownText markdown={feature} className="mb-0" />
    </div>
  )
}

PricingPlanFeature.propTypes = {
  feature: PropTypes.string.isRequired,
}

import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import TickIcon from '@/icons/TickIcon'
import brandColors from '@/constants/brandColors'

export default function PricingTierFeature({ feature, index }) {
  return (
    <div
      key={index}
      className={['flex', 'items-center', 'pb-5'].join(' ')}
    >
      <TickIcon
        className={['h-4', 'w-auto', 'pr-2'].join(' ')}
        fill={brandColors.twitter.bg}
      />
      <MarkdownText markdown={feature} className="mb-0" />
    </div>
  )
}

PricingTierFeature.propTypes = {
  feature: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

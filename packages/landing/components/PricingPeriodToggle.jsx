import ToggleSwitch from '@/elements/ToggleSwitch'
import PropTypes from 'prop-types'
import ButtonPill from '@/elements/ButtonPill'

export default function PricingPeriodToggle({ showAnnualPricing, setShowAnnualPricing }) {
  const handleToggle = () => setShowAnnualPricing(!showAnnualPricing)
  const handlePillClick = () => setShowAnnualPricing(true)

  return (
    <div
      className={[
        'grid',
        'gap-x-4',
        'mb-5',
        'items-center',
      ].join(' ')}
      style={{
        gridTemplateColumns: '1fr auto 1fr',
      }}
    >
      <p
        className={[
          !showAnnualPricing && 'bold',
          'mb-0',
          'text-right',
        ].join(' ')}
      >
        Monthly
      </p>
      <ToggleSwitch
        onChange={handleToggle}
        state={showAnnualPricing}
        offColour="bg-green"
      />
      <p
        className={[
          showAnnualPricing && 'bold',
          'mb-0',
        ].join(' ')}
      >
        Annual
      </p>
      <ButtonPill
        className={[
          'small--p',
          'col-start-3',
          'bold',
          'bg-insta',
          'border-insta',
          'text-white',
          'max-w-fit',
        ].join(' ')}
        onClick={handlePillClick}
      >
        -20%
      </ButtonPill>
    </div>
  )
}

PricingPeriodToggle.propTypes = {
  showAnnualPricing: PropTypes.bool,
  setShowAnnualPricing: PropTypes.func.isRequired,
}

PricingPeriodToggle.defaultProps = {
  showAnnualPricing: false,
}

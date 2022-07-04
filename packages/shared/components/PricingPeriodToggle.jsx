import ToggleSwitch from '@/elements/ToggleSwitch'
import PropTypes from 'prop-types'
import ButtonPill from '@/elements/ButtonPill'

const PricingPeriodToggle = ({ showAnnualPricing, setShowAnnualPricing, className }) => {
  const handleToggle = () => {
    setShowAnnualPricing(!showAnnualPricing)
  }

  const handlePillClick = () => {
    setShowAnnualPricing(true)
  }

  return (
    <div className={className}>
      <p
        className={[
          !showAnnualPricing ? 'bold' : null,
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
        className="mx-4"
      />
      <p
        className={[
          showAnnualPricing ? 'bold' : null,
          'mb-0',
        ].join(' ')}
      >
        Annual
      </p>
      <ButtonPill
        className={[
          'small--p',
          'bold',
          'bg-blue',
          'border-blue',
          'text-white',
          'ml-1',
        ].join(' ')}
        onClick={handlePillClick}
      >
        -20%
      </ButtonPill>
    </div>
  )
}

PricingPeriodToggle.propTypes = {
  showAnnualPricing: PropTypes.bool.isRequired,
  setShowAnnualPricing: PropTypes.func.isRequired,
}

export default PricingPeriodToggle

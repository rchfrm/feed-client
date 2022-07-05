import PropTypes from 'prop-types'

import ToggleSwitch from '@/elements/ToggleSwitch'
import ButtonPill from '@/elements/ButtonPill'

const PricingPeriodToggle = ({
  showAnnualPricing,
  setShowAnnualPricing,
  className,
  buttonPillClassName,
}) => {
  const handleToggle = () => {
    setShowAnnualPricing(!showAnnualPricing)
  }

  const handlePillClick = () => {
    setShowAnnualPricing(true)
  }

  return (
    <div className={['relative', className].join(' ')}>
      <p
        className={[
          !showAnnualPricing ? 'bold' : null,
          'xs:w-16 mb-0',
          'text-right',
        ].join(' ')}
      >
        Monthly
      </p>
      <ToggleSwitch
        onChange={handleToggle}
        state={showAnnualPricing}
        offColour="bg-green"
        className="mx-3"
      />
      <p
        className={[
          showAnnualPricing ? 'bold' : null,
          'xs:w-16 mb-0',
        ].join(' ')}
      >
        Annual
      </p>
      <ButtonPill
        className={[
          'xs:absolute xs:-right-12',
          'small--p',
          'bold',
          'ml-1 xs:ml-0',
          'text-white',
          buttonPillClassName,
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
  className: PropTypes.string,
  buttonPillClassName: PropTypes.string,
}

PricingPeriodToggle.defaultProps = {
  className: null,
  buttonPillClassName: PropTypes.string,
}

export default PricingPeriodToggle

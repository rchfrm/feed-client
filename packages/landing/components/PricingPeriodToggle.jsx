import ToggleSwitch from '@/elements/ToggleSwitch'
import PropTypes from 'prop-types'
import ButtonPill from '@/elements/ButtonPill'

export default function PricingPeriodToggle({ showAnnualPricing, setShowAnnualPricing }) {
  const handleToggle = () => setShowAnnualPricing(!showAnnualPricing)
  const handlePillClick = () => setShowAnnualPricing(true)

  return (
    <>
      <p
        className={[
          'row-start-2',
          'col-span-2',
          'xxs:row-start-1',
          'xxs:col-span-1',
          'xxs:col-start-2',
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
        className={[
          'row-start-2',
          'col-start-3',
          'xxs:row-start-1',
        ].join(' ')}
      />
      <p
        className={[
          'row-start-2',
          'col-start-4',
          'col-span-2',
          'xxs:row-start-1',
          showAnnualPricing && 'bold',
          'mb-0',
        ].join(' ')}
      >
        Annual
      </p>
      <ButtonPill
        className={[
          'small--p',
          'row-start-3',
          'col-start-4',
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
    </>
  )
}

PricingPeriodToggle.propTypes = {
  showAnnualPricing: PropTypes.bool.isRequired,
  setShowAnnualPricing: PropTypes.func.isRequired,
}

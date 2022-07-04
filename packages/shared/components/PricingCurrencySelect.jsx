import Select from '@/elements/Select'
import PropTypes from 'prop-types'
import { pricingCopy } from '@/landing/copy/PricingPageCopy'

const { currencies } = pricingCopy

const PricingCurrencySelect = ({ currency, setCurrency, className }) => {
  const handleChange = (e) => {
    setCurrency(e.target.value)
  }

  const options = currencies.map((currency) => {
    return {
      name: currency,
      value: currency,
    }
  })

  return (
    <div
      className={[
        'flex',
        'justify-end',
        className,
      ].join(' ')}
    >
      <Select
        selectedValue={currency}
        handleChange={handleChange}
        name="PricingCurrencySelect"
        options={options}
        version="small"
        className={[
          'w-full',
          'm-w-100',
          'mb-0',
        ].join(' ')}
      />
    </div>
  )
}

PricingCurrencySelect.propTypes = {
  currency: PropTypes.oneOf(currencies).isRequired,
  setCurrency: PropTypes.func.isRequired,
}

export default PricingCurrencySelect

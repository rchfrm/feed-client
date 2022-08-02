import Select from '@/elements/Select'
import PropTypes from 'prop-types'
import { currencies } from '@/constants/pricing'

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
        'items-center',
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
  className: PropTypes.string,
}

PricingCurrencySelect.defaultProps = {
  className: null,
}

export default PricingCurrencySelect

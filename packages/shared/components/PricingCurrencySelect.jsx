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
        'items-center relative',
        className,
      ].join(' ')}
    >
      <Select
        selectedValue={currency}
        handleChange={handleChange}
        name="PricingCurrencySelect"
        options={options}
        version="small box"
        className="w-16 mb-0"
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

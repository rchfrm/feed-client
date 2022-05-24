import Select from '@/elements/Select'
import PropTypes from 'prop-types'

export default function PricingCurrencySelect({ currency, setCurrency }) {
  const handleChange = e => setCurrency(e.target.value)

  const options = [
    {
      name: 'GBP',
      value: 'GBP',
    },
    {
      name: 'USD',
      value: 'USD',
    },
  ]

  return (
    <Select selectedValue={currency} handleChange={handleChange} name="PricingCurrencySelect" options={options} />
  )
}

PricingCurrencySelect.propTypes = {
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
}

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
    <div
      className={[
        'flex',
        'justify-end',
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
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
}

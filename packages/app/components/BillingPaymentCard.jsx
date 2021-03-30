import React from 'react'
import PropTypes from 'prop-types'

const formatDate = (int) => {
  return int.toString().padStart(2, '0')
}

const BillingPaymentCard = ({
  card,
  billingDetails,
  isDefault,
  isButton,
  isSelected,
  className,
}) => {
  const { brand, exp_month, exp_year: year, last4 } = card
  const { name } = billingDetails
  const month = formatDate(exp_month)
  const ElWrapper = isButton ? 'button' : 'div'
  return (
    <ElWrapper
      className={[
        'flex flex-column justify-between',
        'max-w-md h-48',
        'bg-grey-1 rounded-dialogue p-4',
        `border-2 border-solid ${isSelected ? 'border-green' : 'border-grey-1'}`,
        className,
      ].join(' ')}
      onClick={() => {
        if (!isButton) return
        console.log('SELECT')
      }}
      aria-label={isButton ? 'Select' : null}
    >
      <div className="flex justify-between items-center">
        <p className="capitalize text-lg"><strong>{brand}</strong></p>
      </div>
      <div className="flex justify-between items-end">
        {/* DETAILS */}
        <div>
          {/* NAME */}
          <p className="mb-1">{name}</p>
          {/* DATE */}
          <p className="mb-0">
            <span>Expires </span>
            <span className="font-mono text-lg">{month}/{year}</span>
          </p>
          {/* NUMBER */}
          <p className="mb-0 font-mono text-lg">
            xxxx xxxx xxxx {last4}
          </p>
        </div>
        {/* DEFAULT LABEL */}
        {isDefault && (
          <p className="text-green font-bold mb-0">Default</p>
        )}
      </div>
    </ElWrapper>
  )
}

BillingPaymentCard.propTypes = {
  card: PropTypes.object.isRequired,
  billingDetails: PropTypes.object.isRequired,
  isDefault: PropTypes.bool,
  isButton: PropTypes.bool,
  isSelected: PropTypes.bool,
  className: PropTypes.string,
}

BillingPaymentCard.defaultProps = {
  isDefault: false,
  isButton: false,
  isSelected: false,
  className: null,
}

export default BillingPaymentCard

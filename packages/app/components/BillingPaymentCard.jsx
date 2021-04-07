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
  onClick,
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
        'w-full max-w-md h-48',
        'bg-grey-1 rounded-dialogue p-4',
        `border-2 border-solid ${isSelected ? 'border-green' : 'border-grey-1'}`,
        className,
      ].join(' ')}
      onClick={(e) => {
        e.preventDefault()
        if (!isButton) return
        onClick()
      }}
      aria-label={isButton ? 'Select' : null}
    >
      <div className="flex justify-between items-start w-full">
        {/* BRAND */}
        <p className="block capitalize text-lg mb-0"><strong>{brand}</strong></p>
        {/* RADIO INDICATOR */}
        {isButton && (
          <div className={['radio--button_label -mr-3', isSelected ? '-active' : null].join(' ')} />
        )}
      </div>
      <div className="flex justify-between items-end w-full">
        {/* DETAILS */}
        <div className="text-left">
          {/* NAME */}
          <p className="block mb-1">{name}</p>
          {/* DATE */}
          <p className="block mb-0">
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
  onClick: PropTypes.func,
  className: PropTypes.string,
}

BillingPaymentCard.defaultProps = {
  isDefault: false,
  isButton: false,
  isSelected: false,
  onClick: () => {},
  className: null,
}

export default BillingPaymentCard

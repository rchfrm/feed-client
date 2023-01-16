import React from 'react'
import PropTypes from 'prop-types'

import TrashIcon from '@/icons/TrashIcon'

import brandColors from '@/constants/brandColors'

const formatDate = (int) => {
  return int.toString().padStart(2, '0')
}

const BillingPaymentCard = ({
  paymentMethodId,
  currency,
  card,
  billingDetails,
  isDefault,
  isButton,
  isSelected,
  allowDelete,
  onClick,
  onDelete,
  className,
}) => {
  const { brand, exp_month, exp_year: year, last4 } = card
  const { name } = billingDetails
  const month = formatDate(exp_month)
  const ElWrapper = isButton ? 'button' : 'div'
  return (
    <div className={`relative w-full ${className}`}>
      <ElWrapper
        className={[
          'flex flex-column justify-between',
          'w-full iphone8:h-48',
          'bg-grey-light rounded-dialogue p-4',
          `border-2 border-solid ${isSelected ? 'border-green' : 'border-grey-light'}`,
          className,
        ].join(' ')}
        onClick={(e) => {
          e.preventDefault()
          if (! isButton) return
          onClick()
        }}
        aria-label={isButton ? 'Select' : null}
      >
        <div className="flex justify-between items-start w-full">
          {/* BRAND */}
          <p className="flex items-baseline capitalize mb-0">
            <strong className="text-lg mr-2">{brand}</strong>
            {currency && <span>({currency})</span>}
          </p>
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
            <p className="block text-left text-green font-bold mb-0 pt-2 iphone8:pt-0">Default</p>
          )}
        </div>
      </ElWrapper>
      {/* DELETE BUTTON */}
      {allowDelete && ! isDefault && (
        <button
          className="absolute bottom-0 right-0 m-4 p-1 pl-2 pt-2"
          onClick={(e) => {
            e.preventDefault()
            onDelete(paymentMethodId)
          }}
        >
          <TrashIcon className="w-4 h-auto" fill={brandColors.red} />
        </button>
      )}
    </div>
  )
}

BillingPaymentCard.propTypes = {
  paymentMethodId: PropTypes.string,
  currency: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  billingDetails: PropTypes.object.isRequired,
  isDefault: PropTypes.bool,
  isButton: PropTypes.bool,
  isSelected: PropTypes.bool,
  allowDelete: PropTypes.bool,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

BillingPaymentCard.defaultProps = {
  paymentMethodId: '',
  isDefault: false,
  isButton: false,
  isSelected: false,
  allowDelete: false,
  onDelete: () => {},
  onClick: () => {},
  className: null,
}

export default React.memo(BillingPaymentCard)

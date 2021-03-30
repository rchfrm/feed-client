import React from 'react'
import PropTypes from 'prop-types'

const BillingPaymentCard = ({
  card,
  billingDetails,
  isDefault,
  isButton,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      Card
    </div>
  )
}

BillingPaymentCard.propTypes = {
  card: PropTypes.object.isRequired,
  billingDetails: PropTypes.object.isRequired,
  isDefault: PropTypes.bool,
  isButton: PropTypes.bool,
  className: PropTypes.string,
}

BillingPaymentCard.defaultProps = {
  isDefault: false,
  isButton: false,
  className: null,
}

export default BillingPaymentCard

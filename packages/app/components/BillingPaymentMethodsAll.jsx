import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import BillingPaymentCard from '@/app/BillingPaymentCard'
import copy from '@/app/copy/billingCopy'

const BillingPaymentMethodsAll = ({
  allPaymentMethods,
  className,
  defaultPaymentMethod,
  deleteMethod,
  loading,
  selectedMethodId,
  setMethodAsDefault,
  setSelectedMethodId,
}) => {
  return (
    <div className={[className].join(' ')}>
      <MarkdownText markdown={copy.choosePaymentIntro} />
      <div className="mb-10">
        {allPaymentMethods.map((method) => {
          const { id, currency, card, billing_details: cardBillingDetails, is_default } = method
          return (
            <BillingPaymentCard
              key={id}
              paymentMethodId={id}
              currency={currency}
              card={card}
              billingDetails={cardBillingDetails}
              isDefault={is_default}
              isSelected={id === selectedMethodId}
              isButton
              allowDelete
              onClick={() => {
                setSelectedMethodId(id)
              }}
              onDelete={deleteMethod}
              className="max-w-xs mb-6 last:mb-0"
            />
          )
        })}
      </div>
      {defaultPaymentMethod.id !== selectedMethodId && (
        <Button
          version="black"
          onClick={setMethodAsDefault}
          trackComponentName="BillingPaymentMethodsAll"
          loading={loading}
          className="w-full mb-10"
        >
          Set as default
        </Button>
      )}
    </div>
  )
}

BillingPaymentMethodsAll.propTypes = {
  allPaymentMethods: PropTypes.array.isRequired,
  className: PropTypes.string,
  defaultPaymentMethod: PropTypes.object.isRequired,
  deleteMethod: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedMethodId: PropTypes.string.isRequired,
  setMethodAsDefault: PropTypes.func.isRequired,
  setSelectedMethodId: PropTypes.func.isRequired,
}

BillingPaymentMethodsAll.defaultProps = {
  className: '',
}

export default BillingPaymentMethodsAll

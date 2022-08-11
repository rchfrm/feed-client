import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import AddPaymentForm from '@/app/AddPaymentForm'
import BillingPaymentAddSuccess from '@/app/BillingPaymentAddSuccess'

import copy from '@/app/copy/billingCopy'

import useBillingStore from '@/app/stores/billingStore'

const getBillingStoreState = (state) => ({
  organisation: state.organisation,
})

const BillingPaymentAdd = ({
  shouldBeDefault,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [addPaymentMethod, setAddPaymentMethod] = React.useState(() => {})
  const [isFormValid, setIsFormValid] = React.useState(false)
  const { organisation: { id: organisationId } } = useBillingStore(getBillingStoreState)

  const [paymentMethod, setPaymentMethod] = React.useState(null)
  const [success, setSuccess] = React.useState(false)

  return (
    <section>
      <h3 className="font-bold">
        {copy.addPaymentHeader(success)}
      </h3>
      <div>
        {success ? <BillingPaymentAddSuccess paymentMethod={paymentMethod} /> : (
          <>
            <AddPaymentForm
              organisationId={organisationId}
              setAddPaymentMethod={setAddPaymentMethod}
              setPaymentMethod={setPaymentMethod}
              setSuccess={setSuccess}
              shouldBeDefault={shouldBeDefault}
              isFormValid={isFormValid}
              setIsFormValid={setIsFormValid}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <Button
              version="green"
              disabled={!isFormValid}
              onClick={addPaymentMethod}
              trackComponentName="BillingPaymentAdd"
              loading={isLoading}
              className="w-full"
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </section>
  )
}

BillingPaymentAdd.propTypes = {
  shouldBeDefault: PropTypes.bool,
}

BillingPaymentAdd.defaultProps = {
  shouldBeDefault: false,
}

export default BillingPaymentAdd

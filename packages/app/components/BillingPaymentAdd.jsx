import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import AddPaymentForm from '@/app/AddPaymentForm'
import BillingPaymentAddSuccess from '@/app/BillingPaymentAddSuccess'
import copy from '@/app/copy/billingCopy'

const BillingPaymentAdd = ({
  addMethodToState,
  organization,
  shouldBeDefault,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [addPaymentMethod, setAddPaymentMethod] = React.useState(() => {})
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState(null)
  const [success, setSuccess] = React.useState(false)

  return (
    <section>
      <h3 className="font-bold">
        {copy.addPaymentHeader(shouldBeDefault)}
      </h3>
      <div>
        {success ? <BillingPaymentAddSuccess paymentMethod={paymentMethod} /> : (
          <div className="w-full lg:w-2/3">
            <AddPaymentForm
              organizationId={organization.id}
              setPaymentMethod={setPaymentMethod}
              setSuccess={setSuccess}
              shouldBeDefault={shouldBeDefault}
              addMethodToState={addMethodToState}
              setAddPaymentMethod={setAddPaymentMethod}
              isFormValid={isFormValid}
              setIsFormValid={setIsFormValid}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <Button
              version="black"
              disabled={!isFormValid}
              onClick={addPaymentMethod}
              trackComponentName="BillingPaymentAdd"
              loading={isLoading}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

BillingPaymentAdd.propTypes = {
  addMethodToState: PropTypes.func.isRequired,
  shouldBeDefault: PropTypes.bool,
}

BillingPaymentAdd.defaultProps = {
  shouldBeDefault: false,
}

export default BillingPaymentAdd

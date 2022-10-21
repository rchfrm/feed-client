import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import BillingPaymentMethodsAll from '@/app/BillingPaymentMethodsAll'
import BillingPaymentAdd from '@/app/BillingPaymentAdd'
import copy from '@/app/copy/billingCopy'
import { getBillingDetails, getDefaultPaymentMethod } from '@/app/helpers/billingHelpers'
import useBillingStore from '@/app/stores/billingStore'
import shallow from 'zustand/shallow'

const getBillingStoreState = (state) => ({
  billingStoreOrg: state.organization,
  billingStoreOrgDetails: state.billingDetails,
  billingStorePaymentMethod: state.defaultPaymentMethod,
})

const BillingPaymentMethodsSummary = ({
  className,
  organization,
}) => {
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(undefined)
  const [allPaymentMethods, setAllPaymentMethods] = useState(undefined)

  const {
    billingStoreOrg,
    billingStoreOrgDetails,
    billingStorePaymentMethod,
  } = useBillingStore(getBillingStoreState)

  useEffect(() => {
    if (organization.id === billingStoreOrg.id) {
      setDefaultPaymentMethod(billingStorePaymentMethod)
      setAllPaymentMethods(billingStoreOrgDetails.allPaymentMethods)
      return
    }
    const { allPaymentMethods } = getBillingDetails(organization)
    setAllPaymentMethods(allPaymentMethods)
    const defaultPaymentMethod = getDefaultPaymentMethod(allPaymentMethods)
    setDefaultPaymentMethod(defaultPaymentMethod)
  }, [organization, billingStoreOrg.id, billingStorePaymentMethod, billingStoreOrgDetails.allPaymentMethods])

  return (
    <div className={[className].join(' ')}>
      <h2 className="font-body font-bold mb-6">Payment Methods</h2>
      <div className="mb-10">
        {defaultPaymentMethod ? (
          <BillingPaymentMethodsAll
            allPaymentMethods={allPaymentMethods}
            defaultPaymentMethod={defaultPaymentMethod}
            organization={organization}
            setAllPaymentMethods={setAllPaymentMethods}
            setDefaultPaymentMethod={setDefaultPaymentMethod}
          />
        ) : (
          <MarkdownText markdown={copy.noPaymentMethods} />
        )}
        <BillingPaymentAdd
          shouldBeDefault={!defaultPaymentMethod}
        />
      </div>
    </div>
  )
}

BillingPaymentMethodsSummary.propTypes = {
  className: PropTypes.string,
  defaultPaymentMethod: PropTypes.object,
  organization: PropTypes.object.isRequired,
}

BillingPaymentMethodsSummary.defaultProps = {
  defaultPaymentMethod: null,
  className: '',
}

export default BillingPaymentMethodsSummary

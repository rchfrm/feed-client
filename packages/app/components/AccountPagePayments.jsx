// import React from 'react'

// import usePrevious from 'use-previous'

// import Router from 'next/router'
// import * as ROUTES from '@/app/constants/routes'


// import { BillingContext } from '@/app/contexts/BillingContext'
// import { SidePanelContext } from '@/app/contexts/SidePanelContext'

// import Button from '@/elements/Button'
// import Error from '@/elements/Error'

// import PaymentMethodButton from '@/app/PaymentMethodButton'

// import { setPaymentAsDefault } from '@/app/helpers/paymentHelpers'

// import MarkdownText from '@/elements/MarkdownText'
// import copy from '@/app/copy/AccountPageCopy'

// import styles from '@/app/PaymentPage.module.css'
// import sidePanelStyles from '@/app/SidePanel.module.css'


// const getButton = (submitChanges) => {
//   return (
//     <Button version="green" onClick={submitChanges}>
//       Update default method
//     </Button>
//   )
// }

// function AccountPagePayments() {
//   // Get Billing Context
//   const {
//     billingDetails,
//     fetchBillingDetails,
//     organisation: { id: organisationId },
//   } = React.useContext(BillingContext)
//   // Get Side panel context
//   const {
//     toggleSidePanel,
//     setSidePanelLoading,
//     setSidePanelButton,
//   } = React.useContext(SidePanelContext)
//   // Get account owner billing details
//   const { defaultMethod, allPaymentMethods } = billingDetails.find(({ role }) => role === 'owner')
//   // Get all payment methods that aren't the default
//   const alternativePaymentMethods = allPaymentMethods.filter(({ is_default }) => !is_default)
//   // Put default method first
//   const paymentMethodsSorted = React.useRef([defaultMethod, ...alternativePaymentMethods])
//   // Get ID of default method
//   const { id: initialDefaultMethodId } = defaultMethod
//   const [defaultMethodId, setDefaultMethodId] = React.useState(initialDefaultMethodId)
//   // Toggling whether new method is selected
//   const [hasNewMethod, setHasNewMethod] = React.useState(false)
//   // Error
//   const [error, setError] = React.useState(null)

//   // SUBMIT CHANGES
//   const submitChanges = React.useRef(() => {})
//   submitChanges.current = async () => {
//     setError(null)
//     setSidePanelLoading(true)
//     // Set default
//     const updatePaymentResult = await setPaymentAsDefault(organisationId, defaultMethodId)
//       // Handle error
//       .catch((err) => {
//         setError(err)
//         setDefaultMethodId(initialDefaultMethodId)
//       })
//     if (!updatePaymentResult) {
//       setSidePanelLoading(false)
//       return
//     }
//     // Update billing details context
//     await fetchBillingDetails()
//     // Hide update button
//     setHasNewMethod(false)
//     // Stop loading state
//     setSidePanelLoading(false)
//     // Close panel after delay
//     setTimeout(toggleSidePanel, 1500)
//   }

//   // HANDLE CLICK ON METHOD
//   const previousHasNewMethod = usePrevious(hasNewMethod)
//   const onSelectDefault = (clickedId) => {
//     setDefaultMethodId(clickedId)
//     setHasNewMethod(clickedId !== initialDefaultMethodId)
//   }

//   // TOGGLE SIDEBAR BUTTON based on whether new method is selected
//   const [, forceUpdate] = React.useReducer(x => x + 1, 0)
//   React.useEffect(() => {
//     if (hasNewMethod === previousHasNewMethod) return
//     // If new method selected, show side panel button
//     const submit = () => {
//       forceUpdate()
//       submitChanges.current()
//     }
//     const button = hasNewMethod
//       ? getButton(submit)
//       : null
//     setSidePanelButton(button)
//     // Clean up
//     return () => {
//       setSidePanelButton(null)
//     }
//   }, [hasNewMethod, setSidePanelButton, previousHasNewMethod])

//   // GO TO CHECKOUT PAGE
//   const goToCheckout = () => {
//     Router.push(ROUTES.PAYMENT)
//   }

//   return (
//     <section className={styles.AccountPagePayments}>

//       <h2 className={sidePanelStyles.SidePanel__Header}>Payment Methods</h2>

//       <MarkdownText className={['h4--text', styles.AccountPagePayments__intro].join(' ')} markdown={copy.selectPaymentIntro} />

//       {error && (
//         <div className={styles.AccountPagePayments__error}>
//           <Error error={error} />
//         </div>
//       )}

//       <div className={styles.AccountPagePayments__allMethods}>
//         {/* ALL PAYMENT METHODS */}
//         {paymentMethodsSorted.current.map((method) => {
//           const { id, is_default } = method
//           return (
//             <PaymentMethodButton
//               key={id}
//               method={method}
//               isDefault={is_default}
//               defaultMethodId={defaultMethodId}
//               onClick={onSelectDefault}
//             />
//           )
//         })}
//       </div>


//       {/* ADD PAYMENT METHOD BUTTON */}
//       <div className={styles.AccountPagePayments__addPayment}>
//         <Button
//           className="button--small"
//           onClick={goToCheckout}
//         >
//           + Add new payment method
//         </Button>
//       </div>

//     </section>
//   )
// }

// export default AccountPagePayments

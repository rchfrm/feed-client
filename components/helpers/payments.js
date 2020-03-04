import axios from 'axios'

const getOrganizationDetails = (user) => {
  const { organizations = [] } = user
  const organizationsArray = Object.values(organizations)
  return organizationsArray.map(({ id, name, role, _links: { self: { href: link } } }) => {
    return {
      id,
      name,
      link,
      role,
    }
  })
}


const fetchOrg = async (org, token) => {
  const { link, role } = org
  const { data } = await axios(link, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((err) => {
      return err
    })

  return {
    ...data,
    role,
  }
}


const getbillingDetails = ({ name, payment_status = 'none', billing_details: billingDetails, role }) => {
  // If no payment status setup
  if (payment_status === 'none' || !billingDetails) {
    return {
      name,
      role,
      defaultMethod: false,
      allPaymentMethods: [],
    }
  }


  // Get default payment method
  const { payment_methods: paymentMethods } = billingDetails
  const paymentMethodsArray = Object.values(paymentMethods)
  // Method is the only method, or the one marked as default
  const defaultMethod = paymentMethodsArray.length === 1
    ? paymentMethodsArray[0]
    : paymentMethods.find(({ is_default }) => is_default)
  // Return card details
  const { card: { brand, exp_month, exp_year, last4 } } = defaultMethod
  return {
    name,
    role,
    allPaymentMethods: paymentMethodsArray,
    defaultMethod: {
      brand,
      exp_month,
      exp_year,
      last4,
    },
  }
}

// Run this to test if there is no active payment method
// returns true if no payment
const testNoPayment = (billingDetails) => {
  return billingDetails.some(({ defaultMethod, role }) => {
    return !defaultMethod && role === 'owner'
  })
}

const getAllOrgsInfo = async ({ user, token }) => {
  const orgDetails = getOrganizationDetails(user)
  const fetchOrgPromises = orgDetails.map((org) => fetchOrg(org, token))
  const allOrgsInfo = await Promise.all(fetchOrgPromises)
  return allOrgsInfo
}


export default {
  getOrganizationDetails,
  fetchOrg,
  getbillingDetails,
  getAllOrgsInfo,
  testNoPayment,
}

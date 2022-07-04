export const getAllReferralCodeSlugsQuery = () => `
  query {
    allReferralCodeRedirects {
      slug
    }
  }
`

export const getReferralCodeQuery = (slug) => `
  query {
    referralCodeRedirect(filter: {slug: {eq: "${slug}"}}) {
      referralCode
    }
  }
`

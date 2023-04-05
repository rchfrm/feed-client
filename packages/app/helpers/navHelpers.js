import * as ROUTES from '@/app/constants/routes'

export const primaryLinks = [
  {
    href: ROUTES.ACCOUNT,
    title: 'Account',
    icon: 'account',
  },
  {
    href: ROUTES.NOTIFICATIONS,
    title: 'Notifications',
    icon: 'notifications',
  },
  {
    href: ROUTES.BILLING,
    title: 'Billing',
    icon: 'billing',
  },
  {
    href: ROUTES.FAQS,
    title: 'FAQs',
    icon: 'faqs',
  },
  {
    href: ROUTES.PRICING,
    title: 'Pricing',
    icon: 'terms',
    isExternal: true,
    isMobile: true,
  },
  {
    title: 'Sign out',
    icon: 'signout',
    isSignOut: true,
  },
]

export const secondaryLinks = [
  {
    href: ROUTES.POSTS,
    title: 'Posts',
    matchingHrefs: [ROUTES.POST],
  },
  {
    href: ROUTES.CONTROLS,
    title: 'Controls',
    matchingHrefs: ROUTES.controlsPages,
  },
  {
    href: ROUTES.RESULTS,
    title: 'Results',
  },
]

const termsLink = 'https://archform.ltd/terms/'

export const footerLinks = [
  {
    href: ROUTES.LOGIN,
    title: 'log in',
  },
  {
    href: ROUTES.SIGN_UP,
    title: 'sign up',
  },
  {
    href: ROUTES.FAQS,
    title: 'FAQs',
  },
  {
    href: ROUTES.PRICING,
    title: 'pricing',
  },
  {
    href: termsLink,
    title: 'terms',
    external: true,
  },
]

import * as ROUTES from '@/app/constants/routes'

export const primaryLinks = [
  {
    href: ROUTES.HOME,
    title: 'Posts',
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
  {
    href: ROUTES.INSIGHTS,
    title: 'Insights',
  },
]

const termsLink = 'https://tryfeed.co/legal/terms-of-service'

export const secondaryLinks = [
  {
    href: ROUTES.ACCOUNT,
    title: 'Settings',
    icon: 'settings',
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
    href: termsLink,
    title: 'Terms',
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

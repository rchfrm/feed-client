import React from 'react'
import PropTypes from 'prop-types'

import ControlsWizardFbPermissionsStep from '@/app/ControlsWizardFbPermissionsStep'
import ControlsWizardLinkStep from '@/app/ControlsWizardLinkStep'
import ControlsWizardPostsStep from '@/app/ControlsWizardPostsStep'
import ControlsWizardAdAccountStep from '@/app/ControlsWizardAdAccountStep'
import ControlsWizardLocationStep from '@/app/ControlsWizardLocationStep'
import ControlsWizardBudgetStep from '@/app/ControlsWizardBudgetStep'
import ControlsWizardPaymentStep from '@/app/ControlsWizardPaymentStep'
import ControlsWizardReviewStep from '@/app/ControlsWizardReviewStep'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { WizardContextProvider } from '@/app/contexts/WizardContext'

const ControlsWizard = ({
  setIsWizardActive,
  defaultLinkId,
  missingScopes,
  adAccountId,
  locations,
  budget,
  defaultPaymentMethod,
  isProfilePartOfOrganisation,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const [steps, setSteps] = React.useState([])
  const initialSteps = React.useMemo(() => [
    {
      id: 0,
      title: 'Choose a goal',
      component: <ControlsWizardLinkStep />,
      shouldSkip: Boolean(defaultLinkId),
    },
    {
      id: 1,
      title: 'Make new posts promotable by default?',
      component: <ControlsWizardPostsStep />,
      shouldSkip: false,
      hasSkipButton: true,
    },
    {
      id: 2,
      title: 'Facebook Permissions',
      component: <ControlsWizardFbPermissionsStep scopes={missingScopes} />,
      shouldSkip: !missingScopes.length,
      hasSkipButton: true,
    },
    {
      id: 3,
      title: 'Select Facebook Ad Account',
      component: <ControlsWizardAdAccountStep />,
      shouldSkip: Boolean(adAccountId),
    },
    {
      id: 4,
      title: 'Where are you based?',
      component: <ControlsWizardLocationStep />,
      shouldSkip: Object.keys(locations).length > 0 || Boolean(artist?.country_code),
      hasSkipButton: true,
    },
    {
      id: 5,
      title: 'Set your daily budget',
      component: <ControlsWizardBudgetStep />,
      shouldSkip: Boolean(budget),
    },
    {
      id: 6,
      title: 'Add a payment method',
      component: <ControlsWizardPaymentStep />,
      shouldSkip: !isProfilePartOfOrganisation || Boolean(defaultPaymentMethod),
    },
    {
      id: 7,
      title: 'All set!',
      component: <ControlsWizardReviewStep />,
      shouldSkip: false,
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  React.useEffect(() => {
    // Filter out the steps that should be skipped
    setSteps(initialSteps.filter((step) => !step.shouldSkip))
  }, [initialSteps])

  React.useEffect(() => {
    setIsWizardActive(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col h-full">
      {steps.length && (
        <WizardContextProvider steps={steps} hasBackButton>
          {steps.map((step) => <React.Fragment key={step.id}>{step.component}</React.Fragment>)}
        </WizardContextProvider>
      )}
    </div>
  )
}

ControlsWizard.propTypes = {
  setIsWizardActive: PropTypes.func.isRequired,
  defaultLinkId: PropTypes.string,
  missingScopes: PropTypes.array.isRequired,
  adAccountId: PropTypes.string,
  budget: PropTypes.number.isRequired,
  defaultPaymentMethod: PropTypes.object,
  isProfilePartOfOrganisation: PropTypes.bool,
}

ControlsWizard.defaultProps = {
  defaultPaymentMethod: null,
  defaultLinkId: '',
  adAccountId: '',
  isProfilePartOfOrganisation: false,
}

export default ControlsWizard

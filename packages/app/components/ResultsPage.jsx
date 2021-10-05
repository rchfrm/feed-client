import React from 'react'

import ControlsWizard from '@/app/ControlsWizard'
import ResultsLoader from '@/app/ResultsLoader'

import Spinner from '@/elements/Spinner'

import useControlsWizard from '@/app/hooks/useControlsWizard'

const ResultsPage = () => {
  const [isWizardActive, setIsWizardActive] = React.useState(false)
  const {
    hasSetUpControls,
    isLoading,
    defaultLinkId,
    defaultPromotionEnabled,
    budget,
    defaultPaymentMethod,
  } = useControlsWizard()

  if (isLoading) return <Spinner />

  return (
    !hasSetUpControls || isWizardActive ? (
      <div className="md:grid grid-cols-12 gap-8">
        <div className="col-span-6 col-start-1">
          <ControlsWizard
            setIsWizardActive={setIsWizardActive}
            defaultLinkId={defaultLinkId}
            defaultPromotionEnabled={defaultPromotionEnabled}
            budget={budget}
            defaultPaymentMethod={defaultPaymentMethod}
          />
        </div>
      </div>
    ) : (
      <ResultsLoader />
    )
  )
}

ResultsPage.propTypes = {
}

export default ResultsPage

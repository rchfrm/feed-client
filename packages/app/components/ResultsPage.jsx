import React from 'react'

import ControlsWizard from '@/app/ControlsWizard'
import ResultsLoader from '@/app/ResultsLoader'

import Spinner from '@/elements/Spinner'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import useControlsWizard from '@/app/hooks/useControlsWizard'

const ResultsPage = () => {
  const [isWizardActive, setIsWizardActive] = React.useState(false)
  const { globalLoading } = React.useContext(InterfaceContext)
  const { artistId } = React.useContext(ArtistContext)
  const {
    hasSetUpControls,
    isLoading,
    adAccountId,
    defaultLinkId,
    defaultPromotionEnabled,
    budget,
    defaultPaymentMethod,
    isProfilePartOfOrganisation,
  } = useControlsWizard()

  React.useEffect(() => {
    setIsWizardActive(false)
  }, [artistId])

  if (globalLoading || isLoading) return <Spinner />

  return (
    !hasSetUpControls || isWizardActive ? (
      <div className="md:grid grid-cols-12 gap-8">
        <div className="col-span-6 col-start-1">
          <ControlsWizard
            setIsWizardActive={setIsWizardActive}
            adAccountId={adAccountId}
            defaultLinkId={defaultLinkId}
            defaultPromotionEnabled={defaultPromotionEnabled}
            budget={budget}
            defaultPaymentMethod={defaultPaymentMethod}
            isProfilePartOfOrganisation={isProfilePartOfOrganisation}
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

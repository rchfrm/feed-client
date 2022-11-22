import React from 'react'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import AdCreation from '@/app/AdCreation'
import Button from '@/elements/Button'
import PlusIcon from '@/icons/PlusIcon'
import brandColors from '@/constants/brandColors'

const AdCreationButton = () => {
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)

  const openSidePanel = () => {
    setSidePanelContent(<AdCreation />)
    toggleSidePanel(true)
  }

  return (
    <Button
      version="green"
      onClick={openSidePanel}
      trackComponentName="AdCreationButton"
      className="mb-5"
    >
      <PlusIcon className="h-4 w-4 mr-2" fill={brandColors.white} />
      Create ad
    </Button>
  )
}

AdCreationButton.propTypes = {
}

AdCreationButton.defaultProps = {
}

export default AdCreationButton

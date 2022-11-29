import React from 'react'
import PropTypes from 'prop-types'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import AdCreation from '@/app/AdCreation'
import Button from '@/elements/Button'
import PlusIcon from '@/icons/PlusIcon'
import brandColors from '@/constants/brandColors'

const AdCreationButton = ({ className }) => {
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
      className={[className, 'mb-5'].join(' ')}
    >
      <PlusIcon className="h-4 w-4 mr-2" fill={brandColors.white} />
      Create ad
    </Button>
  )
}

AdCreationButton.propTypes = {
  className: PropTypes.string,
}

AdCreationButton.defaultProps = {
  className: null,
}

export default AdCreationButton

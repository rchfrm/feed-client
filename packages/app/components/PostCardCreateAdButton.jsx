import React from 'react'
import PropTypes from 'prop-types'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import AdCreation from '@/app/AdCreation'
import PlusIcon from '@/icons/PlusIcon'
import brandColors from '@/constants/brandColors'

const PostCardCreateAdButton = ({ className }) => {
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)

  const openSidePanel = () => {
    setSidePanelContent(<AdCreation />)
    toggleSidePanel(true)
  }

  return (
    <button
      onClick={openSidePanel}
      trackComponentName="AdCreationButton"
      className={[
        'flex items-center justify-center',
        'rounded-dialogue border-2 border-solid border-green',
        'bg-white font-bold',
        className,
      ].join(' ')}
    >
      <PlusIcon className="h-4 w-4 mr-2" fill={brandColors.textColor} />
      Create ad
    </button>
  )
}

PostCardCreateAdButton.propTypes = {
  className: PropTypes.string,
}

PostCardCreateAdButton.defaultProps = {
  className: null,
}

export default PostCardCreateAdButton
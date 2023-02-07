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
      className={[
        'relative rounded-dialogue border-2 border-solid border-green',
        'bg-white font-bold',
        className,
      ].join(' ')}
      style={{ paddingTop: '100%' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <PlusIcon className="h-5 w-5 mr-1" fill={brandColors.black} />
        Create ad
      </div>
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

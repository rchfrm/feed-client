import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import PencilIcon from '@/icons/PencilIcon'
import PlusIcon from '@/icons/PlusIcon'
import TickIcon from '@/icons/TickIcon'

import useCreateEditLinkBankLink from '@/app/hooks/useCreateEditLinkBankLink'

import brandColors from '@/constants/brandColors'

const LinkBankListButtons = ({
  editModeOn,
  setEditModeOn,
  totalLinks,
  className,
}) => {
  // FUNCTION FOR EDITING LINKS
  const addLink = useCreateEditLinkBankLink({
    action: 'add',
  })
  return (
    <div
      className={[
        'flex',
        className,
      ].join(' ')}
    >
      {/* ADD */}
      <Button
        version="x-small black icon"
        className="mr-5"
        onClick={() => addLink()}
        trackComponentName="LinkBankListButtons"
      >
        <PlusIcon style={{ height: '0.75rem' }} fill={brandColors.bgColor} />
        {totalLinks > 0 ? 'Add' : 'Add a link'}
      </Button>
      {/* EDIT */}
      {totalLinks > 0 && (
        <Button
          version="x-small green icon"
          onClick={() => {
            setEditModeOn((isOn) => {
              return !isOn
            })
          }}
          trackComponentName="LinkBankListButtons"
        >
          {editModeOn ? (
            <>
              <TickIcon fill={brandColors.bgColor} />
              Done
            </>
          ) : (
            <>
              <PencilIcon fill={brandColors.bgColor} style={{ height: '1rem' }} />
              Edit
            </>
          )}
        </Button>
      )}
    </div>
  )
}

LinkBankListButtons.propTypes = {
  editModeOn: PropTypes.bool.isRequired,
  setEditModeOn: PropTypes.func.isRequired,
  totalLinks: PropTypes.number.isRequired,
  className: PropTypes.string,
}

LinkBankListButtons.defaultProps = {
  className: null,
}


export default LinkBankListButtons

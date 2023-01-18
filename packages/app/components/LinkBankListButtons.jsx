import React from 'react'
import PropTypes from 'prop-types'

import ButtonNew from '@/elements/ButtonNew'
import PencilIcon from '@/icons/PencilIcon'
import PlusIcon from '@/icons/PlusIcon'
import TickIcon from '@/icons/TickIcon'

import useCreateEditLinkBankLink from '@/app/hooks/useCreateEditLinkBankLink'

const LinkBankListButtons = ({
  editModeOn,
  setEditModeOn,
  totalLinks,
  className,
  isDisabled,
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
      <ButtonNew
        size="small"
        className="mr-5"
        onClick={() => addLink()}
        trackComponentName="LinkBankListButtons"
        isDisabled={isDisabled}
      >
        <PlusIcon className="w-4 h-auto mr-1" />
        {totalLinks > 0 ? 'Add' : 'Add a link'}
      </ButtonNew>
      {/* EDIT */}
      {totalLinks > 0 && (
        <ButtonNew
          size="small"
          version="secondary"
          onClick={() => {
            setEditModeOn((isOn) => {
              return ! isOn
            })
          }}
          isDisabled={isDisabled}
          trackComponentName="LinkBankListButtons"
        >
          {editModeOn ? (
            <>
              <TickIcon className="w-4 h-auto mr-1" />
              Done
            </>
          ) : (
            <>
              <PencilIcon className="w-4 h-auto mr-1" />
              Edit
            </>
          )}
        </ButtonNew>
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

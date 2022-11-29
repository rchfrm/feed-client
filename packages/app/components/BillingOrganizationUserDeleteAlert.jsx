import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'
import useAlertStore from '@/stores/alertStore'

import copy from '@/app/copy/billingCopy'

const BillingOrganizationUserDeleteAlert = ({
  confirmAlert,
  setConfirmAlert,
  user,
  onConfirm,
}) => {
  // HANDLE ALERT
  const { showAlert } = useAlertModal()
  const isOpen = useAlertStore((state) => state.isOpen)
  const alertButtons = React.useMemo(() => {
    return [
      {
        text: 'Continue',
        onClick: () => {
          setConfirmAlert('')
          onConfirm(user, true)
        },
        color: 'green',
      },
      {
        text: 'Cancel',
        onClick: () => {
          setConfirmAlert('')
        },
        color: 'black',
      },
    ]
  }, [setConfirmAlert, onConfirm, user])

  React.useEffect(() => {
    if (confirmAlert) {
      const alertContents = <MarkdownText markdown={copy.userDeleteAlert} className="mb-0" />
      showAlert({
        children: alertContents,
        buttons: alertButtons,
      })
    }
  }, [confirmAlert, showAlert, alertButtons])

  // HANDLE CLOSING THE ALERT BY AN OUTSIDE CLICK
  React.useEffect(() => {
    if (!isOpen) {
      setConfirmAlert('')
    }
  }, [setConfirmAlert, isOpen])

  return null
}

BillingOrganizationUserDeleteAlert.Types = {
  confirmAlert: PropTypes.string.isRequired,
  setConfirmAlert: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
}

BillingOrganizationUserDeleteAlert.Props = {
  className: null,
}

export default BillingOrganizationUserDeleteAlert

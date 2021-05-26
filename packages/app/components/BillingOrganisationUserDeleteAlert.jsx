import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/billingCopy'

const BillingOrganisationUserDeleteAlert = ({
  confirmAlert,
  setConfirmAlert,
  user,
  onConfirm,
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
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
      return
    }
    closeAlert()
  }, [confirmAlert, showAlert, closeAlert, alertButtons])

  return null
}

BillingOrganisationUserDeleteAlert.Types = {
  confirmAlert: PropTypes.string.isRequired,
  setConfirmAlert: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
}

BillingOrganisationUserDeleteAlert.Props = {
  className: null,
}

export default BillingOrganisationUserDeleteAlert

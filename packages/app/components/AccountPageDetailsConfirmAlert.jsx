import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/AccountPageCopy'

const AccountPageDetailsConfirmAlert = ({
  confirmAlert,
  setConfirmAlert,
  resubmitForm,
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  const alertButtons = React.useMemo(() => {
    return [
      {
        text: 'Continue',
        onClick: () => {
          setConfirmAlert('')
          resubmitForm(null, true)
        },
      },
      {
        text: 'Cancel',
        onClick: () => {
          setConfirmAlert('')
        },
        version: 'secondary',
      },
    ]
  }, [setConfirmAlert, resubmitForm])

  React.useEffect(() => {
    if (confirmAlert) {
      const markdown = confirmAlert === 'email' ? copy.changeEmailAlert : copy.changePasswordAlert
      const alertContents = <MarkdownText markdown={markdown} className="mb-0" />
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

AccountPageDetailsConfirmAlert.propTypes = {
  confirmAlert: PropTypes.string.isRequired,
  setConfirmAlert: PropTypes.func.isRequired,
  resubmitForm: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AccountPageDetailsConfirmAlert.defaultProps = {
  className: null,
}

export default AccountPageDetailsConfirmAlert

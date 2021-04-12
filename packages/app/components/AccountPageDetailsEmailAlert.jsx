import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/AccountPageCopy'

const AccountPageDetailsEmailAlert = ({
  showEmailAlert,
  setShowEmailAlert,
  resubmitForm,
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  const alertButtons = React.useMemo(() => {
    return [
      {
        text: 'Continue',
        onClick: () => {
          setShowEmailAlert(false)
          resubmitForm(null, true)
        },
        color: 'green',
      },
      {
        text: 'Cancel',
        onClick: () => {
          setShowEmailAlert(false)
        },
        color: 'black',
      },
    ]
  }, [setShowEmailAlert, resubmitForm])

  React.useEffect(() => {
    if (showEmailAlert) {
      const alertContents = <MarkdownText markdown={copy.changeEmailAlert} className="mb-0" />
      showAlert({
        children: alertContents,
        buttons: alertButtons,
      })
      return
    }
    closeAlert()
  }, [showEmailAlert, showAlert, closeAlert, alertButtons])

  return null
}

AccountPageDetailsEmailAlert.propTypes = {
  showEmailAlert: PropTypes.bool.isRequired,
  setShowEmailAlert: PropTypes.func.isRequired,
  resubmitForm: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AccountPageDetailsEmailAlert.defaultProps = {
  className: null,
}

export default AccountPageDetailsEmailAlert

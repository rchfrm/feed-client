import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/targetingPageCopy'

const TargetingBudgetTabsAlert = ({
  show,
  budgetType,
  setShouldShowAlert,
}) => {
  const alertContents = React.useMemo(() => {
    return <MarkdownText markdown={copy.budgetTypeSwitchWarning(budgetType)} className="mb-0" />
  }, [budgetType])

  const { showAlert, closeAlert } = useAlertModal()

  React.useEffect(() => {
    if (! show) {
      return closeAlert()
    }

    const buttons = [
      {
        text: 'Ok',
        onClick: () => {
          setShouldShowAlert(false)
          closeAlert()
        },
      },
    ]

    showAlert({
      children: alertContents,
      buttons,
    })
  }, [show, alertContents, showAlert, closeAlert, setShouldShowAlert])

  React.useEffect(() => {
    return closeAlert
  }, [closeAlert])

  return null
}

TargetingBudgetTabsAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  budgetType: PropTypes.string.isRequired,
  setShouldShowAlert: PropTypes.func.isRequired,
}

TargetingBudgetTabsAlert.defaultProps = {
}

export default TargetingBudgetTabsAlert

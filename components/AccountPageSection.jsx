import React from 'react'
import PropTypes from 'prop-types'

import AccountPageDetailsSummary from './AccountPageDetailsSummary'
import AccountPagePaymentSummary from './AccountPagePaymentSummary'
import AccountConnectionsSummary from './AccountConnectionsSummary'

import styles from './AccountPage.module.css'

const getSection = ({ type, user, onReady }) => {
  // Get account section
  if (type === 'account') {
    return (
      <AccountPageDetailsSummary
        className={styles.accountPageSection__details}
        user={user}
        onReady={onReady}
      />
    )
  }
  // Get payment summary
  if (type === 'payment') {
    return (
      <AccountPagePaymentSummary
        className={styles.accountPageSection__details}
        user={user}
        onReady={onReady}
      />
    )
  }
  // Get connections summary
  if (type === 'connections') {
    return (
      <AccountConnectionsSummary
        className={styles.accountPageSection__details}
        user={user}
        onReady={onReady}
      />
    )
  }
}

const AccountPageSection = ({ title, type, user, buttonText, setSidePanel }) => {
  const [sectionReady, setSectionReady] = React.useState(false)
  // Allows child component to change the button text
  const [newButtonText, setNewButtonText] = React.useState('')
  // Allows the child component to change the side panel type
  const [newSidePanelType, setNewSidePanelType] = React.useState('')

  // Call this when the section is ready
  const onReady = (buttonText = '', sidePanelType = '') => {
    setSectionReady(true)
    setNewButtonText(buttonText)
    setNewSidePanelType(sidePanelType)
  }

  const onClick = () => {
    setSidePanel(newSidePanelType || type)
  }

  // Fetch section to show
  const section = getSection({ type, user, onReady })

  return (
    <section className={styles.accountPageSection}>
      <h2 className={[styles.h2, 'h2'].join()}>{title}</h2>

      {section}

      {sectionReady && (newButtonText || buttonText) && (
        <button onClick={onClick} className="button  button--black  button--small">
          <span>{ newButtonText || buttonText }</span>
        </button>
      )}
    </section>
  )
}

AccountPageSection.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  buttonText: PropTypes.string,
  setSidePanel: PropTypes.func,
}

AccountPageSection.defaultProps = {
  title: '',
  buttonText: '',
  setSidePanel: () => {},
}

export default AccountPageSection

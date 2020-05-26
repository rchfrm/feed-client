import React from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'
import * as ROUTES from '../constants/routes'

import Button from './elements/Button'

import AccountPageDetailsSummary from './AccountPageDetailsSummary'

import styles from './AccountPage.module.css'

const getSection = ({ type, user, onReady }) => {
  // Get account section
  if (type === 'details') {
    return (
      <AccountPageDetailsSummary
        className={styles.accountPageSection__details}
        user={user}
        onReady={onReady}
      />
    )
  }
}

const AccountPageSection = ({ title, type, user, buttonText }) => {
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

  // OPEN SIDE PANEL
  // Go to account page with query to toggle side panel
  const onClick = () => {
    const query = newSidePanelType || type
    Router.push(`${ROUTES.ACCOUNT}?${query}`)
  }

  // Fetch section to show
  const section = getSection({ type, user, onReady })

  return (
    <section className={[styles.accountPageSection].join(' ')}>
      <h2 className={[styles.h2, 'h2'].join()}>{title}</h2>

      {section}

      {sectionReady && (newButtonText || buttonText) && newButtonText !== false && (
        <Button
          onClick={onClick}
          version="black small"
        >
          { newButtonText || buttonText }
        </Button>
      )}
    </section>
  )
}

AccountPageSection.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  buttonText: PropTypes.string,
}

AccountPageSection.defaultProps = {
  title: '',
  buttonText: '',
}

export default AccountPageSection


// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import PageHeader from './PageHeader'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Input from './elements/Input'
import Button from './elements/Button'
import Error from './elements/Error'
import Alert, { alertReducer } from './elements/Alert'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import helper from './helpers/helper'
// IMPORT STYLES
import styles from './Budget.module.css'

import MarkdownText from './elements/MarkdownText'
import copy from '../copy/BudgetCopy'
import brandColors from '../constants/brandColors'

const initialAlertState = {
  contents: undefined,
}

function PostsBudget({ currency }) {
  const { artist, updateBudget } = React.useContext(ArtistContext)

  // DEFINE STATES
  const initialBudgetState = {
    amount: '',
    text: 'Save',
    disabled: true,
    color: brandColors.greyDark,
    bgColor: brandColors.greyLight,
  }
  const [budget, setBudget] = React.useState(initialBudgetState)
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)

  // Define input placeholder
  const [budgetPlaceholder, setBudgetPlaceholder] = React.useState('')
  React.useEffect(() => {
    const budgetFormatted = helper.formatCurrency(Number(artist.daily_budget))
    const placeholder = `Current Budget: ${budgetFormatted}`
    setBudgetPlaceholder(placeholder)
  }, [artist.daily_budget])

  // Call this to reset the input
  const resetBudgetState = () => setBudget(initialBudgetState)

  // CLEAR ALERT
  const resetAlert = () => {
    setAlert({ type: 'reset-alert' })
    // Ater closing alert, wait a second then reset budget state
    setTimeout(() => {
      resetBudgetState()
    }, 1000)
  }

  // DEFINE ALERT BUTTONS
  const AlertButton = () => (
    <Button
      version="black"
      onClick={resetAlert}
      width={31.48}
    >
      Ok
    </Button>
  )

  // DEFINE ERROR
  const [error, setError] = React.useState(null)
  // END DEFINE ERROR

  const handleChange = e => {
    e.preventDefault()
    setError(null)
    setBudget({
      amount: e.target.value,
      text: 'Save',
      disabled: false,
      color: brandColors.bgColor,
      bgColor: brandColors.textColor,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setBudget({
      ...budget,
      text: 'Saving...',
      disabled: true,
      color: brandColors.greyDark,
      bgColor: brandColors.greyLight,
    })
    const budgetAmount = budget.amount || 0
    const dailyBudget = await updateBudget(artist.id, currency, budgetAmount)
      .catch((error) => {
        setError(error)
        setBudget(initialBudgetState)
        setAlert({ type: 'reset-alert' })
      })
    setBudget({
      ...budget,
      text: 'Saved!',
      disabled: true,
      color: brandColors.bgColor,
      bgColor: brandColors.successColor,
    })
    setAlert({
      type: 'show-alert',
      payload: {
        contents: <BudgetConfirmation budget={dailyBudget} />,
      },
    })
  }

  return (
    <div>

      <Alert
        contents={alert.contents}
        resetAlert={resetAlert}
        buttons={<AlertButton />}
      />

      <PageHeader heading="set your budget" />

      <div className="ninety-wide" style={{ marginBottom: '2em' }}>

        <MarkdownText className="h3--text" markdown={copy.introText} />

        <form onSubmit={onSubmit} className={styles.form}>

          <Input
            className={styles.inputContainer}
            name="budget"
            placeholder={budgetPlaceholder}
            value={budget.amount}
            handleChange={handleChange}
            type="number"
            version="box"
          />

          <Button
            className={styles.submitButton}
            version="black  wide"
            disabled={budget.disabled}
            textColor={budget.color}
            bgColor={budget.bgColor}
            type="submit"
          >
            {budget.text}
          </Button>

        </form>

        <MarkdownText className="" markdown={copy.budgetOutro} />

        <Error error={error} />

      </div>
    </div>
  )
}

function BudgetConfirmation({ budget }) {
  const budgetInt = Number(budget)

  // Message for setting budget to 0
  if (budgetInt === 0) {
    return <MarkdownText markdown={copy.pauseBudget} />
  }

  // Message for setting budget to positive number
  const budgetFormatted = helper.formatCurrency(budget)
  return <MarkdownText markdown={copy.setBudget(budgetFormatted)} />
}

export default PostsBudget

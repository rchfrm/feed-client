
// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import PageHeader from './PageHeader'
import BudgetConfirmation from './BudgetConfirmation'
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
import * as utils from './helpers/utils'
// IMPORT STYLES
import styles from './Budget.module.css'

import MarkdownText from './elements/MarkdownText'
import copy from '../copy/BudgetCopy'
import brandColors from '../constants/brandColors'

const initialAlertState = {
  contents: undefined,
}

function PostsBudget({ currency }) {
  const { artist, artistId, updateBudget } = React.useContext(ArtistContext)
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
    const budgetFormatted = utils.formatCurrency(Number(artist.daily_budget), currency)
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
      style={{
        width: '31.48%',
      }}
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
    })
    const budgetAmount = budget.amount || 0
    const previousBudget = artist.daily_budget
    const dailyBudget = await updateBudget(artist.id, budgetAmount)
      .catch((error) => {
        setError(error)
        setBudget(initialBudgetState)
        setAlert({ type: 'reset-alert' })
      })
    if (typeof dailyBudget !== 'number') return
    setBudget({
      ...budget,
      text: 'Saved!',
      disabled: true,
    })
    setAlert({
      type: 'show-alert',
      payload: {
        contents: <BudgetConfirmation budget={dailyBudget} previousBudget={previousBudget} artistId={artistId} />,
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

      <div>

        <MarkdownText className="h3--text" markdown={copy.budgetIntro} />

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

export default PostsBudget


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
import styles from './PostsPage.module.css'

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
    amount: artist.daily_budget,
    text: 'Save',
    disabled: true,
    color: brandColors.greyDark,
    bgColor: brandColors.greyLight,
  }
  const [budget, setBudget] = React.useState(initialBudgetState)
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)

  // DEFINE ALERT REPONSES
  const resetAlert = () => setAlert({ type: 'reset-alert' })

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
    if (Number(e.target.value) === artist.daily_budget) {
      setBudget(initialBudgetState)
    } else if (e.target.value >= 0) {
      setBudget({
        amount: e.target.value,
        text: 'Save',
        disabled: false,
        color: brandColors.bgColor,
        bgColor: brandColors.textColor,
      })
    }
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
    try {
      const budgetAmount = budget.amount || 0
      const dailyBudget = await updateBudget(artist.id, currency, budgetAmount)
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
    } catch (err) {
      setError(err)
      setBudget(initialBudgetState)
      setAlert({ type: 'reset-alert' })
    }
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

        <MarkdownText className="h3--text" markdown={copy.budgetIntro} />

        <form onSubmit={onSubmit} className={styles.BudgetForm}>

          <Input
            className={styles.BudgetForm_inputContainer}
            name="budget"
            placeholder={currency}
            value={budget.amount === 0 ? '' : budget.amount}
            handleChange={handleChange}
            type="number"
            version="box"
          />

          <Button
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

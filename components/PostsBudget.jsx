
// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Input from './elements/Input'
import Button from './elements/Button'
import Feed from './elements/Feed'
import Error from './elements/Error'
import Alert from './elements/Alert'
// IMPORT PAGES
import { alertReducer } from './ResultsAll'
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
import PageHeader from './PageHeader'
// import AlertButtons from './elements/AlertButtons'
// IMPORT STYLES
import styles from './PostsPage.module.css'

import MarkdownText from './elements/MarkdownText'
import copy from '../copy/PostsPageCopy'
import brandColors from '../constants/brandColors'

const initialAlertState = {
  contents: undefined,
  // responseExpected: true,
  // confirmationText: "Yes.",
  // rejectionText: "No.",
  // response: false,
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

  const handleClick = async e => {
    e.preventDefault()
    setBudget({
      ...budget,
      text: 'Saving...',
      disabled: true,
      color: brandColors.greyDark,
      bgColor: brandColors.greyLight,
    })
    try {
      const dailyBudget = await updateBudget(artist.id, currency, budget.amount)
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

        <div className={styles.BudgetForm}>

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
            onClick={handleClick}
            disabled={budget.disabled}
            textColor={budget.color}
            bgColor={budget.bgColor}
          >
            {budget.text}
          </Button>

        </div>

        <MarkdownText className="" markdown={copy.budgetOutro} />

        <Error error={error} />

      </div>
    </div>
  )
}

function BudgetConfirmation({ budget }) {
  const budgetInt = Number(budget)

  if (budgetInt === 0) {
    return (
      <div style={{ width: '100%', paddingBottom: '1em' }}>
        <h1>
          <Feed />
          {' '}
          is paused.
        </h1>
        <p>Your posts are no longer being promoted. When you're ready, just update your daily budget to resume.</p>
      </div>
    )
  }
  return (
    <div style={{ width: '100%', paddingBottom: '1em' }}>
      <h1>Thanks!</h1>
      <p>That's all we need from you.</p>
      <p>
        Your daily budget has been set to
        {' '}
        <span className="bold">
          £
          {budget}
        </span>
        {' '}
        and
        {' '}
        <Feed />
        {' '}
        is promoting your posts.
      </p>
      <p>
        In a few hours, you'll be able to see how they're doing on the
        {' '}
        <Link href={ROUTES.RESULTS}><a>results page</a></Link>
        .
      </p>
    </div>
  )
}

export default PostsBudget

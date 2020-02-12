
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
// IMPORT PAGES
import { alertReducer } from './ResultsAll'
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
import Error from './elements/Error'
import PageHeader from './elements/PageHeader'
import Alert from './elements/Alert'
// IMPORT STYLES
import styles from './PostsPage.module.css'

const initialAlertState = {
  contents: undefined,
  // responseExpected: true,
  // confirmationText: "Yes.",
  // rejectionText: "No.",
  // response: false,
}

function Budget({ currency }) {
  const { artist, updateBudget } = React.useContext(ArtistContext)

  // DEFINE STATES
  const initialBudgetState = {
    amount: artist.daily_budget,
    text: 'Save',
    disabled: true,
    colour: '#B7B7B7',
    bgColour: '#E5E5E5',
  }
  const [budget, setBudget] = React.useState(initialBudgetState)
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)
  // DEFINE STATES

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
        colour: 'white',
        bgColour: 'black',
      })
    }
  }

  const handleClick = async e => {
    e.preventDefault()
    setBudget({
      ...budget,
      text: 'Saving...',
      disabled: true,
      colour: '#B7B7B7',
      bgColour: '#E5E5E5',
    })
    try {
      const dailyBudget = await updateBudget(artist.id, currency, budget.amount)
      setBudget({
        ...budget,
        text: 'Saved!',
        disabled: true,
        colour: 'white',
        bgColour: '#6edcd3',
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
        setAlert={setAlert}
      />

      <PageHeader heading="set your budget" />

      <div className="ninety-wide" style={{ marginBottom: '2em' }}>

        <h3>Enter the amount you'd like to spend each day:</h3>

        <div className={styles['budget-form']}>

          <Input
            name="budget"
            className={styles.box}
            placeholder={currency}
            value={budget.amount === 0 ? '' : budget.amount}
            onChange={handleChange}
            type="number"
            label="none"
            version="box"
            width={65.738}
          />

          <Button
            version="black"
            onClick={handleClick}
            width={31.48}
            disabled={budget.disabled}
            marginBottom="1em"
            textColour={budget.colour}
            bgColour={budget.bgColour}
          >
            {budget.text}
          </Button>

        </div>

        <p>
          We recommend at least
          {currency}
          3 per day.
        </p>

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
        <span className="bold">
          £
          {budget}
        </span>
        {' '}
        and
        <Feed />
        {' '}
        is promoting your posts.
      </p>
      <p>
        In a few hours, you'll be able to see how they're doing on the
        <Link href={ROUTES.RESULTS}><a>results page</a></Link>
        .
      </p>
    </div>
  )
}

export default Budget

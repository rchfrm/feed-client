// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import BudgetConfirmation from '@/app/BudgetConfirmation'
import PaymentSummary from '@/app/PaymentSummary'
// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Alert, { alertReducer } from '@/elements/Alert'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
// IMPORT STYLES
import styles from '@/app/Budget.module.css'

import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/BudgetCopy'
import brandColors from '@/constants/brandColors'

const initialAlertState = {
  contents: undefined,
}

function BudgetContent() {
  const { artist, artistId, artistCurrency, updateBudget, artistLoading } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
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

  // Turn off global loading after artist finishes loading
  React.useEffect(() => {
    if (!artistLoading) toggleGlobalLoading(false)
  }, [artistLoading, toggleGlobalLoading])

  // Define input placeholder
  const [budgetPlaceholder, setBudgetPlaceholder] = React.useState('')
  React.useEffect(() => {
    const budgetFormatted = utils.formatCurrency(Number(artist.daily_budget), artistCurrency)
    const placeholder = `Current Budget: ${budgetFormatted}`
    setBudgetPlaceholder(placeholder)
  }, [artist.daily_budget, artistCurrency])

  // Define min budget
  const [minBudget, setMinBudget] = React.useState({})
  const [minBudgetFb, setMinBudgetFb] = React.useState({})
  React.useEffect(() => {
    const { min_daily_budget_info: minBudgetInfo } = artist
    if (!minBudgetInfo || !artistId) {
      setMinBudget('£3.00')
      return
    }
    const {
      amount,
      currency: {
        code: currencyCode,
        offset: currencyOffset,
      },
    } = minBudgetInfo
    const {
      fbMinBudgetFloat,
      fbMinBudgetString,
      minBudgetFloat,
      minBudgetString,
    } = utils.getMinBudget(amount, currencyCode, currencyOffset)
    // Set reccomended min budget
    setMinBudget({
      float: minBudgetFloat,
      string: minBudgetString,
    })
    // Set FB min budget
    setMinBudgetFb({
      float: fbMinBudgetFloat,
      string: fbMinBudgetString,
    })
  // eslint-disable-next-line
  }, [artistId])

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
    setError(null)
    const { amount: submittedBudget } = budget
    // Handle too small
    if (parseFloat(submittedBudget) < minBudgetFb.float) {
      setError({ message: `Error: The amount you submitted is smaller than Facebook's mininmum budget of ${minBudgetFb.string}` })
      return
    }
    setBudget({
      ...budget,
      text: 'Saving...',
      disabled: true,
    })
    const budgetAmount = submittedBudget || 0
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
        contents: (
          <BudgetConfirmation
            budget={dailyBudget}
            previousBudget={previousBudget}
            artistId={artistId}
            artistCurrency={artistCurrency}
          />
        ),
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

      <div className="grid base--grid">

        <MarkdownText className="h3--text col-span-12" markdown={copy.budgetIntro} />

        <form onSubmit={onSubmit} className={[styles.form, 'col-span-12', 'lg:col-span-6'].join(' ')}>

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

        {error && (
          <div className="col-span-12 lg:col-span-6">
            <Error error={error} />
          </div>
        )}

        {/* spacer */}
        <div className="hidden lg:block col-span-12 lg:col-span-6" />

        <MarkdownText className="col-span-12 lg:col-span-6" markdown={copy.budgetOutro(minBudget.string)} />

        {/* spacer */}
        <div className="hidden lg:block col-span-12 lg:col-span-6" />

        <PaymentSummary className="col-span-12 lg:col-span-6" />
      </div>

    </div>
  )
}

export default BudgetContent

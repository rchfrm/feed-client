import React from 'react'
// import PropTypes from 'prop-types'
import Router from 'next/router'
import shallow from 'zustand/shallow'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import useReferralStore from '@/app/stores/referralStore'

import styles from '@/LoginPage.module.css'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/referralCodeCopy'
import loginCopy from '@/app/copy/LoginPageCopy'

const getReferralStoreState = (state) => ({
  hasTrueCode: state.hasTrueCode,
  testCodeValidity: state.testCodeValidity,
  testCodeTruth: state.testCodeTruth,
  storeTrueCode: state.storeTrueCode,
})

const SignupAddReferralCode = ({}) => {
  // READ STORE
  const {
    hasTrueCode,
    testCodeValidity,
    testCodeTruth,
    storeTrueCode,
  } = useReferralStore(getReferralStoreState, shallow)
  // LOCAL STATE
  const [code, setCode] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  // ON ADDING A TRUE CODE
  React.useEffect(() => {
    if (hasTrueCode) {
      // Store code in local storage
      storeTrueCode(code)
      // PUSH TO SIGN UP if code is true
      Router.push(ROUTES.SIGN_UP)
    }
  // eslint-disable-next-line
  }, [hasTrueCode])

  return (
    <div className={styles.container}>
      <h2 className="h3">{copy.submitReferralCopy}</h2>
      <Error error={error} />
      <form
        className="mb-8"
        onSubmit={async (e) => {
          e.preventDefault()
          if (!code) return
          setLoading(true)
          setError(null)
          const isValid = testCodeValidity(code)
          if (!isValid) {
            setError({ message: copy.invalidCodeCopy })
            setLoading(false)
            return
          }
          const isTrue = await testCodeTruth(code)
          if (!isTrue) {
            setError({ message: copy.invalidCodeCopy })
          }
          setLoading(false)
        }}
      >
        <Input
          updateValue={(value) => {
            setCode(value.toUpperCase())
          }}
          name="referral-code"
          // label="Referral code"
          value={code}
          autoFocus
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-buttonWidthWide"
            disabled={!code}
            loading={loading}
          >
            Join
          </Button>
        </div>
      </form>
      {/* Link to login page */}
      <MarkdownText markdown={loginCopy.loginReminder} />
    </div>
  )
}

SignupAddReferralCode.propTypes = {

}

export default SignupAddReferralCode

import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import useReferralStore from '@/app/stores/referralStore'

import copy from '@/app/copy/referralCodeCopy'

const getReferralStoreState = (state) => ({
  hasValidCode: state.hasValidCode,
  hasTrueCode: state.hasTrueCode,
  testCodeValidity: state.testCodeValidity,
  testCodeTruth: state.testCodeTruth,
  storeTrueCode: state.storeTrueCode,
  getStoredReferrerCode: state.getStoredReferrerCode,
})

const SignupPageAddReferral = ({
  className,
}) => {
  // READ STORE
  const {
    hasValidCode,
    testCodeValidity,
    testCodeTruth,
  } = useReferralStore(getReferralStoreState, shallow)

  const [code, setCode] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  // TEST VALIDITY and update store when code changes
  React.useEffect(() => {
    testCodeValidity(code)
  }, [code, testCodeValidity])
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (! hasValidCode) return
          setIsLoading(true)
          const isTrue = await testCodeTruth(code)
          setIsLoading(false)
          const error = isTrue ? null : { message: copy.invalidCodeCopy }
          setError(error)
          if (error) {
            setCode('')
          }
        }}
      >
        <div className="relative">
          <Input
            name="referral-code"
            label="Referral code"
            value={code}
            handleChange={(e) => {
              const { target: { value } } = e
              setCode(value.toUpperCase())
            }}
          />
          <Button
            className="absolute right-0 mr-4"
            style={{ bottom: '0.6rem' }}
            type="submit"
            version="green x-small"
            loading={isLoading}
            disabled={! hasValidCode}
            trackComponentName="SignupPageAddReferral"
          >
            Submit
          </Button>
        </div>
      </form>
      <Error error={error} className="-mt-2" />
    </div>
  )
}

SignupPageAddReferral.propTypes = {
  className: PropTypes.string,
}

SignupPageAddReferral.defaultProps = {
  className: null,
}

export default SignupPageAddReferral

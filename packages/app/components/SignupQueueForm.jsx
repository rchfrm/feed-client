import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import Input from '@/elements/Input'
import Button from '@/elements/Button'

import { testValidUrl, testValidEmail } from '@/helpers/utils'

const formElements = [
  {
    id: 'MERGE0',
    label: 'Email',
    type: 'email',
    autoCapitalize: 'off',
    autoCorrect: 'off',
    required: true,
    errorMessage: 'Please enter a valid email',
  },
  {
    id: 'MERGE1',
    label: 'Name',
    required: true,
    hidden: true,
  },
  {
    id: 'MERGE2',
    label: 'Surname',
    hidden: true,
  },
  {
    id: 'MMERGE8',
    label: 'Facebook page',
    required: true,
    type: 'url',
    errorMessage: 'Please inlcude a valid link',
  },
  {
    id: 'MMERGE9',
    label: 'Instagram page',
    type: 'url',
  },
  {
    id: 'MMERGE10',
    label: 'Link to your work',
    placeholder: 'https://',
    type: 'url',
    required: true,
    errorMessage: 'Please inlcude a valid link',
  },
  {
    id: 'MMERGE11',
    label: 'Reason for wanting to use Feed',
  },
]

const testValidInput = (type, value) => {
  if (!type) return !!value
  if (type === 'url') return testValidUrl(value)
  if (type === 'email') return testValidEmail(value)
}

const SignupQueueForm = ({ className }) => {
  const [values, setValues] = React.useState({})
  const [isFormValid, setIsFormValid] = React.useState(false)

  React.useEffect(() => {
    const hasEmptyRequired = formElements.some(({ required, id }) => {
      const { value, valid } = values[id] || {}
      return !value && required && !valid
    })
    setIsFormValid(!hasEmptyRequired)
  }, [values])
  return (
    <form
      className={[
        'relative',
        className,
      ].join(' ')}
    >
      {/* HIDDEN To add them to the 'Waiting List' group */}
      <input
        type="checkbox"
        id="group_64"
        name="group[6082][64]"
        value="1"
        className="av-checkbox"
        checked
        readOnly
        style={{
          position: 'absolute',
          left: '-10000em',
        }}
      />

      {formElements.map((element, index) => {
        const {
          id,
          type,
          label,
          placeholder,
          autoCapitalize,
          autoCorrect,
          hidden,
          required,
          errorMessage,
        } = element
        if (hidden) return
        const { value, valid, error } = values[id] || {}
        return (
          <Input
            key={id}
            type={type}
            autoFocus={index === 0}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            name={id}
            id={id}
            value={value}
            label={label}
            placeholder={placeholder}
            required={required}
            error={error}
            errorMessage={errorMessage}
            handleChange={(e) => {
              const { target: { value } } = e
              setValues((values) => {
                const valid = testValidInput(type, value)
                return produce(values, draftValues => {
                  draftValues[id] = {
                    value,
                    valid,
                    error: false,
                  }
                })
              })
            }}
            onBlur={() => {
              setValues((values) => {
                return produce(values, draftValues => {
                  draftValues[id].error = !valid && required
                })
              })
            }}
          />
        )
      })}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={!isFormValid}
        >
          Join the queue
        </Button>
      </div>
    </form>
  )
}

SignupQueueForm.propTypes = {
  className: PropTypes.string,
}

SignupQueueForm.defaultProps = {
  className: null,
}


export default SignupQueueForm

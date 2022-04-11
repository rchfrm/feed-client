import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useDebounce from '@/app/hooks/useDebounce'

import Input from '@/elements/Input'

const SearchInput = ({
  name,
  label,
  placeholder,
  onChange,
  setValue,
  setError,
  onSuccess,
  limit,
  className,
}) => {
  const [query, setQuery] = React.useState('')

  const debouncedQuery = useDebounce(query, 300)

  const handleChange = (e) => {
    const { target: { value } } = e

    setQuery(value)
  }

  useAsyncEffect(async () => {
    if (!debouncedQuery) {
      setValue([])
      return
    }

    const { res, error } = await onChange(debouncedQuery)

    if (error) {
      setError(error)
      return
    }

    onSuccess()
    setValue(res.slice(0, limit))
  }, [debouncedQuery])

  return (
    <Input
      name={name}
      label={label}
      value={query}
      placeholder={placeholder}
      handleChange={handleChange}
      className={className}
    />
  )
}

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  limit: PropTypes.number,
  className: PropTypes.string,
}

SearchInput.defaultProps = {
  label: '',
  placeholder: '',
  limit: 5,
  className: '',
}

export default SearchInput

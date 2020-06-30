import React from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'

import Input from '@/elements/Input'
import Button from '@/elements/Button'

const PageQuerySetter = ({
  label,
  placeholder,
  pathname,
  queryName,
}) => {
  const [query, setQuery] = React.useState('')
  const handleChange = React.useCallback((e) => {
    setQuery(e.target.value)
  }, [setQuery])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault()
    if (!query) return
    const newUrl = `${pathname}?${queryName}=${query}`
    Router.push(newUrl)
  }, [pathname, queryName, query])

  return (
    <form className="flex items-end w-100" onSubmit={onSubmit}>
      <Input
        className="flex-1 mb-0 mr-5"
        handleChange={handleChange}
        name="Page query"
        label={label}
        placeholder={placeholder}
        value={query}
      />
      <Button type="submit" className="mb-0" disabled={!query}>Submit</Button>
    </form>
  )
}

PageQuerySetter.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  queryName: PropTypes.string.isRequired,
}

PageQuerySetter.defaultProps = {
  label: 'Query ID',
  placeholder: 'id string',
}


export default PageQuerySetter

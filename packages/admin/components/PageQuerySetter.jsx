import React from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'

import Input from '@/elements/Input'
import Button from '@/elements/Button'

const PageQuerySetter = ({
  intro,
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
    <form className="flex flex-wrap items-end w-full" onSubmit={onSubmit}>
      {intro && <p className="w-full">{intro}</p>}
      <Input
        className="flex-1 mb-0 mr-5"
        handleChange={handleChange}
        name="Page query"
        label={label}
        placeholder={placeholder}
        value={query}
      />
      <Button type="submit" className="mb-0" disabled={!query}>Fetch tournaments</Button>
    </form>
  )
}

PageQuerySetter.propTypes = {
  intro: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  queryName: PropTypes.string.isRequired,
}

PageQuerySetter.defaultProps = {
  intro: '',
  label: 'Query ID',
  placeholder: 'id string',
}


export default PageQuerySetter

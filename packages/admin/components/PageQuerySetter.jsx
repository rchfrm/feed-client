import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import produce from 'immer'

import Input from '@/elements/Input'
import Button from '@/elements/Button'

const PageQuerySetter = ({
  intro,
  queries,
  pathname,
  submitText,
  filledQueries,
}) => {
  const [typedQueries, setTypedQueries] = React.useState(filledQueries)
  const handleChange = React.useCallback((index, value) => {
    const newQueries = produce(typedQueries, (draftQueries) => {
      draftQueries[index] = value
    })
    setTypedQueries(newQueries)
  }, [typedQueries, setTypedQueries])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault()
    if (!typedQueries.length) return
    const newUrl = typedQueries.reduce((url, query, index) => {
      const { queryName } = queries[index]
      const prefix = index === 0 ? '?' : '&'
      return `${url}${prefix}${queryName}=${query}`
    }, `${pathname}`)
    Router.push(newUrl)
  }, [typedQueries, queries, pathname])

  return (
    <form className="sm:flex flex-wrap items-end w-full" onSubmit={onSubmit}>
      {intro && <p className="w-full">{intro}</p>}
      {queries.map(({ label, queryName }, index) => {
        return (
          <Input
            key={queryName}
            className="flex-1 sm:mb-0 mr-5"
            handleChange={(e) => handleChange(index, e.target.value)}
            name="Page query"
            label={label}
            value={typedQueries[index]}
          />
        )
      })}
      <Button
        type="submit"
        className="mb-0"
        disabled={!typedQueries.length === queries.length}
        trackComponentName="PageQuerySetter"
      >
        {submitText}
      </Button>
    </form>
  )
}

PageQuerySetter.propTypes = {
  intro: PropTypes.string,
  queries: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired,
  submitText: PropTypes.string,
  filledQueries: PropTypes.array,
}

PageQuerySetter.defaultProps = {
  intro: '',
  submitText: 'Go',
  filledQueries: [],
}


export default PageQuerySetter

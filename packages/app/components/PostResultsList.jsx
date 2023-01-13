import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PostResultsListItem from '@/app/PostResultsListItem'
import * as utils from '@/helpers/utils'

const PostResultsList = ({
  results,
  content,
  className,
}) => {
  const { artistCurrency } = React.useContext(ArtistContext)

  const maxResults = 6
  const resultsArray = React.useMemo(() => {
    if (! results) {
      return []
    }

    const resultsFormatted = utils.getDataArray(content, results, { preserveRawNumber: true })
      .filter(({ value }) => value)
      .slice(0, maxResults)

    return resultsFormatted
  }, [results, content])

  if (! resultsArray.length) {
    return (
      <div
        className={[
          'border-solid border-2 border-green rounded-dialogue',
          'p-3',
          className,
        ].join(' ')}
      >
        <p className="mb-0">Paid results will appear here soon</p>
      </div>
    )
  }

  return (
    <ul
      className={[
        'border-solid border-2 border-green rounded-dialogue',
        className,
      ].join(' ')}
    >
      {resultsArray.map(({ name, key, value }) => {
        const parsedValue = key === 'spend'
          ? utils.formatCurrency(value, artistCurrency)
          : utils.formatNumber(value)

        const drilldownResults = results.drilldowns ? results.drilldowns[key] : null
        return (
          <PostResultsListItem
            key={key}
            title={name}
            value={parsedValue}
            drilldownResults={drilldownResults}
            artistCurrency={artistCurrency}
            className="border-solid border-green border-b-2 last:border-none"
          />
        )
      })}
    </ul>
  )
}

PostResultsList.propTypes = {
  results: PropTypes.object,
  content: PropTypes.array.isRequired,
  className: PropTypes.string,
}

PostResultsList.defaultProps = {
  results: null,
  className: null,
}

export default PostResultsList

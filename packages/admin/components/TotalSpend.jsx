import Error from '@/elements/Error'
import React from 'react'
import PropTypes from 'prop-types'

export default function TotalSpend({ isLoading, error, spend, currency }) {
  if (isLoading) return <p>Loading...</p>
  if (error) return <Error error={error} />
  return <p>{spend.toFixed(2)} {currency}</p>
}

TotalSpend.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  spend: PropTypes.number,
  currency: PropTypes.string.isRequired,
}

TotalSpend.defaultProps = {
  error: null,
  spend: 0,
}

import PropTypes from 'prop-types'

export default function TotalSpend({ artistId }) {
  return (
    <h4><strong>Total Spend</strong></h4>
  )
}

TotalSpend.propTypes = {
  artistId: PropTypes.string.isRequired,
}

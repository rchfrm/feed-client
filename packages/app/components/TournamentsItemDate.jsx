import React from 'react'
import PropTypes from 'prop-types'

const TournamentsItemDate = ({ date, className }) => {
  return (
    <div className={['text-center', className].join(' ')}>
      <p
        className={[
          'inline-block rounded-pill whitespace-no-wrap mx-auto',
          'py-1 px-2 mb-0',
          'bg-grey-1 text-sm',
        ].join(' ')}
      >
        {date}
      </p>
    </div>
  )
}

TournamentsItemDate.propTypes = {
  date: PropTypes.string.isRequired,
  className: PropTypes.string,
}

TournamentsItemDate.defaultProps = {
  className: '',
}


export default TournamentsItemDate

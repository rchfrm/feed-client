import React from 'react'
import PropTypes from 'prop-types'

const getStatusColor = (status) => {
  if (status === 'active') return 'green'
  if (status === 'archived') return 'black'
  if (status === 'voided') return 'red'
  if (status === 'pending') return 'grey-2'
  return null
}

const TournamentsItemDateStatus = ({ date, status, className }) => {
  const statusColor = getStatusColor(status)
  return (
    <div className={['text-center text-sm', className].join(' ')}>
      <div>
        <p
          className={[
            'inline-block rounded-pill whitespace-no-wrap mx-auto',
            'py-1 px-2 mb-0',
            'bg-grey-1',
          ].join(' ')}
        >
          {date}
        </p>
      </div>
      <p className="mt-2">
        {/* DOT */}
        <span
          className={[
            'inline-block w-2 h-2 rounded-full',
            'mr-2',
            `bg-${statusColor}`,
          ].join(' ')}
        />
        {/* STATUS NAME */}
        <em className="inline-block">{status}</em>
      </p>
    </div>
  )
}

TournamentsItemDateStatus.propTypes = {
  date: PropTypes.string.isRequired,
  className: PropTypes.string,
  status: PropTypes.string,
}

TournamentsItemDateStatus.defaultProps = {
  className: '',
  status: ' ',
}


export default TournamentsItemDateStatus

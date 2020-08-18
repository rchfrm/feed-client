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
        <div
          className={[
            'inline-flex items-center',
            'rounded-pill whitespace-no-wrap mx-auto',
            'py-1 px-3 mb-0',
            'bg-grey-1',
          ].join(' ')}
          style={{ paddingBottom: '0.3rem' }}
        >
          {/* DATE */}
          <p className="mb-0">{date}</p>
          {/* STATUS */}
          <p
            className="mb-0 ml-2"
            style={{ transform: 'translateY(-0.1em)' }}
          >
            {/* DOT */}
            <span
              className={[
                'inline-block w-2 h-2 rounded-full',
                'mr-2',
                `bg-${statusColor}`,
              ].join(' ')}
            />
            {/* STATUS NAME */}
            <em className="inline-block" style={{ transform: 'translateY(0.05em)' }}>
              {status}
            </em>
          </p>
        </div>
      </div>
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

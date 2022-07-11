import PropTypes from 'prop-types'

export default function ManagedPlanHeader({ header }) {
  return (
    <h2
      className={[
        'bg-black',
        'text-white',
        'mb-0',
        'p-5',
        'pb-7',
      ].join(' ')}
    >
      {header}
    </h2>
  )
}

ManagedPlanHeader.propTypes = {
  header: PropTypes.string.isRequired,
}

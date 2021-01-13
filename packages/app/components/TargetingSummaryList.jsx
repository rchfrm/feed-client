import React from 'react'
import PropTypes from 'prop-types'

import TargetingSummaryEditButton from '@/app/TargetingSummaryEditButton'

import { getSummary } from '@/app/helpers/targetingHelpers'

const SUMMARY_DETAIL = ({ name, value }) => {
  return (
    <li className={[
      'mb-4 last:mb-0',
      'leading-relaxed',
      name === 'Genders' ? 'capitalize' : null,
    ].join(' ')}
    >
      <span>{name}: </span>
      <strong>{value}</strong>
    </li>
  )
}

const TargetingSummaryList = ({ targetingState, setCurrentView, className }) => {
  const summaries = [
    {
      name: 'Ages',
      value: getSummary.ages(targetingState),
    },
    {
      name: 'Genders',
      value: getSummary.genders(targetingState),
    },
    {
      name: 'Platforms',
      value: getSummary.platforms(targetingState),
    },
    {
      name: 'Countries',
      value: getSummary.countries(targetingState),
    },
    {
      name: 'Cities',
      value: getSummary.cities(targetingState),
    },
  ]

  return (
    <div
      className={[
        'relative',
        'p-4 sm:p-5',
        'bg-grey-1 rounded-dialogue',
        className,
      ].join(' ')}
    >
      <TargetingSummaryEditButton
        setCurrentView={setCurrentView}
        className={[
          'absolute top-0 right-0',
          'm-4 sm:m-5',
        ].join(' ')}
      />
      <ul className="mb-0">
        {summaries.map(({ name, value }) => {
          return <SUMMARY_DETAIL key={name} name={name} value={value} />
        })}
      </ul>
    </div>
  )
}

TargetingSummaryList.propTypes = {
  targetingState: PropTypes.object.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TargetingSummaryList.defaultProps = {
  className: null,
}



export default TargetingSummaryList

import React from 'react'
import PropTypes from 'prop-types'

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

const TargetingSummaryList = ({ targetingState }) => {
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
      name: 'Countries',
      value: getSummary.countries(targetingState),
    },
    {
      name: 'Cities',
      value: getSummary.cities(targetingState),
    },
  ]

  return (
    <ul
      className={[
        'p-4 sm:p-5',
        'bg-grey-1 rounded-dialogue',
      ].join(' ')}
    >
      {summaries.map(({ name, value }) => {
        return <SUMMARY_DETAIL key={name} name={name} value={value} />
      })}
    </ul>
  )
}

TargetingSummaryList.propTypes = {
  targetingState: PropTypes.object.isRequired,
}


export default TargetingSummaryList

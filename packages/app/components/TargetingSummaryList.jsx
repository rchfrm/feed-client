import React from 'react'
import PropTypes from 'prop-types'

import { getSummary } from '@/app/helpers/cboHelpers'

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

const TargetingSummaryList = ({ cboState, currency }) => {
  const summaries = [
    {
      name: 'Budget',
      value: getSummary.budget(cboState, currency),
    },
    {
      name: 'Ages',
      value: getSummary.ages(cboState),
    },
    {
      name: 'Genders',
      value: getSummary.genders(cboState),
    },
    {
      name: 'Countries',
      value: getSummary.countries(cboState),
    },
    {
      name: 'Cities',
      value: getSummary.cities(cboState),
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
  cboState: PropTypes.object.isRequired,
  currency: PropTypes.string,
}

TargetingSummaryList.defaultProps = {
  currency: '',
}


export default TargetingSummaryList

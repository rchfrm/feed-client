import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

import { getDataArray } from '@/helpers/utils'
import { metricsToDisplay } from '@/helpers/tournamentHelpers'
import { metricTooltips } from '@/app/copy/tournamentsCopy'

import styles from '@/app/Tournaments.module.css'

const ROW_HEADER = ({ name, tooltip, isAdPair }) => {
  return (
    <h4
      className={[
        'flex items-center',
        isAdPair ? 'mt-12 mb-16' : '-mt-1',
        tooltip && '-mr-8',
      ].join(' ')}
    >
      {name}
      {tooltip && (
        <TooltipButton copy={tooltip} direction="left" buttonClasses={styles.infoTooltip} />
      )}
    </h4>
  )
}

const TournamentsItemMetricsRows = ({ dataA, dataB, isAdPair, className }) => {
  const details = React.useMemo(() => {
    const detailsA = getDataArray(metricsToDisplay, dataA)
    const detailsB = dataB ? getDataArray(metricsToDisplay, dataB) : []
    const detailsObj = detailsA.reduce((data, detailA) => {
      const { name: nameA, value: valueA, key: keyA } = detailA
      // Get matching data from source B (with fallbacks)
      const detailB = detailsB.find(({ key }) => keyA === key) || {}
      const { name: nameB = nameA, value: valueB = '-' } = detailB
      // Set values for data type
      data[keyA] = {
        a: { name: nameA, value: valueA, key: keyA },
        b: { name: nameB, value: valueB, key: `${keyA}-b` },
      }
      // return completed object
      return data
    }, {})
    return Object.entries(detailsObj)
  }, [dataA, dataB])
  return (
    <ul className={['flex justify-between mb-0 text-center', isAdPair ? 'mt-4' : '', className].join(' ')}>
      {details.map(([dataType, { a, b }]) => {
        const { name, value: valueA } = a
        const { value: valueB } = b
        const tooltip = metricTooltips[dataType]
        const header = <ROW_HEADER name={name} tooltip={tooltip} isAdPair={isAdPair} />
        return (
          <li key={dataType} className={[styles.metricColumn, isAdPair && 'mt-5'].join(' ')}>
            {!isAdPair && header}
            <p>{valueA}</p>
            {isAdPair && header}
            {dataB && <p>{valueB}</p>}
          </li>
        )
      })}
    </ul>
  )
}

TournamentsItemMetricsRows.propTypes = {
  dataA: PropTypes.object.isRequired,
  dataB: PropTypes.object,
  isAdPair: PropTypes.bool,
  className: PropTypes.string,
}

TournamentsItemMetricsRows.defaultProps = {
  dataB: null,
  isAdPair: false,
  className: '',
}


export default TournamentsItemMetricsRows

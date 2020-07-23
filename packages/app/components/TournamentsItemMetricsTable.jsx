import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemMetrics = ({ adMetrics, isAdPair, className }) => {
  return (
    <div className={[className, 'sm:pl-2'].join(' ')}>
      <table
        className={[
          'text-left',
          'w-full',
          'mb-0',
          !isAdPair ? styles._singleAd : '',
          styles.dataTable,
        ].join(' ')}
      >
        {isAdPair && (
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>A</th>
              <th>B</th>
            </tr>
          </thead>
        )}
        <tbody>
          {adMetrics.map(({ dataType, tooltip, a, b }) => {
            return (
              <tr key={dataType}>
                <td className="flex pr-5 items-center">
                  {a.name}
                  {tooltip && (
                    <TooltipButton copy={tooltip} direction="right" buttonClasses={styles.infoTooltip} />
                  )}
                </td>
                <td className={styles.dataCell}>{a.value}</td>
                {isAdPair && <td>{b.value}</td>}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

TournamentsItemMetrics.propTypes = {
  adMetrics: PropTypes.array.isRequired,
  isAdPair: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TournamentsItemMetrics.defaultProps = {
  className: '',
}


export default TournamentsItemMetrics

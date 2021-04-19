import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import TooltipButton from '@/elements/TooltipButton'

import { formatNumber, formatCurrency } from '@/helpers/utils'
import { metricsToDisplay } from '@/helpers/tournamentHelpers'

const BAR = ({ type, value, percent, isEmpty, singleBar }) => {
  // Define background
  const backgroundClass = isEmpty ? null
    : value === 0 ? 'bg-grey-1'
      : type === 'a' ? 'bg-green'
        : 'bg-purple'
  // Define width
  const width = singleBar ? 50
    : type === 'a' ? 100
      : percent
  // Define x pos
  const xPositionClass = singleBar ? 'mx-auto'
    : type === 'a' ? 'left-0'
      : 'right-0'
  if (percent === 0) return null
  return (
    <div
      className={[
        !singleBar ? 'absolute' : null,
        't-0 h-full',
        backgroundClass,
        xPositionClass,
      ].join(' ')}
      style={{
        width: `${width}%`,
        zIndex: type === 'a' ? 0 : 1,
      }}
    />
  )
}

const VALUE = ({ type, value, singleBar }) => {
  const xPositionClass = type === 'a' ? 'left-0' : 'right-0'
  const paddingClass = singleBar ? null
    : type === 'a' ? 'pl-2'
      : 'pr-2'
  const textPostClass = singleBar ? 'w-full text-center' : null
  return (
    <p
      className={[
        'absolute text-sm mb-0 pb-1',
        xPositionClass,
        paddingClass,
        textPostClass,
      ].join(' ')}
      style={{
        top: '0.16rem',
        zIndex: 3,
      }}
    >
      {value || '-'}
    </p>
  )
}

const TournamentsItemMetrics = ({ adMetrics, isAdPair, className }) => {
  const { artistCurrency: currency } = React.useContext(ArtistContext)
  // SHOW MISSING METRICS
  // Fill in missing ad metrics
  const adMetricsFilled = React.useMemo(() => {
    // If all metrics are present just show original
    if (adMetrics.length === metricsToDisplay.length) return adMetrics
    // Get array of visible metrics
    const visibleMetrics = Object.values(adMetrics).map(({ dataType }) => dataType)
    // Start modifying adMetrics...
    return produce(adMetrics, adMetricsDraft => {
      metricsToDisplay.forEach((metric, index) => {
        // If metric is missing from ad metrics, add it in
        if (!visibleMetrics.includes(metric)) {
          const missingMetric = { dataType: metric, isEmpty: true, name: metric }
          adMetricsDraft.splice(index, 0, missingMetric)
        }
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adMetrics.length])


  return (
    <div
      className={[
        'flex flex-col',
        'pt-8 xs:pt-4 md:pt-0',
        '-mt-1 xs:mt-0',
        className,
        'TournamentsItemMetrics',
      ].join(' ')}
      style={{ willChange: 'transform opacity' }}
    >
      {adMetricsFilled.map(({ isEmpty, dataType, name, tooltip, a, b }) => {
        const { value: valueA } = a || {}
        const { value: valueB, percent: percentB } = b || {}
        const valueAFormatted = dataType === 'spend'
          ? formatCurrency(valueA, currency)
          : formatNumber(valueA)
        const valueBFormatted = dataType === 'spend'
          ? formatCurrency(valueB, currency)
          : formatNumber(valueB)
        return (
          <div key={dataType} className="relative mb-4 last:mb-0">
            {/* DATA TITLE */}
            <div className="text-sm mb-1">
              <span className="inline-block capitalize">{name}</span>
              {/* TOOLTIP */}
              {tooltip && (
                <TooltipButton
                  copy={tooltip}
                  direction="top"
                  buttonClasses="inline-block relative z-10"
                  trackLabel={`Tournament metric: ${name}`}
                  buttonStyle={{
                    transform: 'translateY(0.74em)',
                  }}
                />
              )}
            </div>
            {/* PERCENTAGE BAR */}
            <div className="relative h-6">
              <BAR
                type="a"
                isEmpty={isEmpty}
                singleBar={!isAdPair}
                value={valueA}
              />
              <VALUE
                type="a"
                value={valueAFormatted}
                singleBar={!isAdPair}
              />
              {/* SECOND BAR */}
              {isAdPair && (
                <>
                  <BAR type="b" value={valueB} percent={percentB} />
                  <VALUE type="b" value={valueBFormatted} />
                </>
              )}
            </div>
          </div>
        )
      })}
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

import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

import { formatNumber, formatCurrency } from '@/helpers/utils'

const BAR = ({ type, percent }) => {
  const bgA = 'bg-green'
  const bgB = 'bg-purple'
  return (
    <div
      className={[
        'absolute t-0 h-full',
        type === 'a' ? bgA : bgB,
        type === 'a' ? 'left-0' : 'right-0',
      ].join(' ')}
      style={{
        width: `${type === 'a' ? 100 : percent}%`,
        zIndex: type === 'a' ? 0 : 1,
      }}
    />
  )
}

const VALUE = ({ type, value }) => {
  return (
    <p
      className={[
        'absolute text-sm mb-0 pb-1',
        type === 'a' ? 'left-0' : 'right-0',
        type === 'a' ? 'pl-2' : 'pr-2',
      ].join(' ')}
      style={{
        top: '0.15rem',
        zIndex: 3,
      }}
    >
      {value}
    </p>
  )
}

const TournamentsItemMetrics = ({ adMetrics, isAdPair, currency, className }) => {
  return (
    <div className={['flex flex-col pt-4', 'md:-mt-5', className].join(' ')}>
      {adMetrics.map(({ dataType, tooltip, a, b }) => {
        const { value: valueA } = a
        const { value: valueB, percent: percentB } = b || {}
        const valueAFormatted = dataType === 'spend' ? formatCurrency(valueA, currency)
          : formatNumber(valueA)
        const valueBFormatted = dataType === 'spend' ? formatCurrency(valueB, currency)
          : formatNumber(valueB)
        return (
          <div key={dataType} className="relative mb-4 last:mb-0 pr-8">
            {/* DATA TITLE */}
            <div className="text-sm mb-1">{a.name}</div>
            {/* TOOLTIP */}
            {tooltip && (
              <TooltipButton
                copy={tooltip}
                direction="left"
                buttonClasses="absolute right-0 -mt-1 -mr-2 z-10"
                messageStyle={{
                  maxWidth: '62vw',
                }}
              />
            )}
            {/* PERCENTAGE BAR */}
            <div className="relative h-6">
              <BAR type="a" />
              <VALUE type="a" value={valueAFormatted || '-'} />
              {isAdPair && (
                <>
                  <BAR type="b" percent={percentB} />
                  <VALUE type="b" value={valueBFormatted || '-'} />
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
  currency: PropTypes.string,
  className: PropTypes.string,
}

TournamentsItemMetrics.defaultProps = {
  currency: '',
  className: '',
}


export default TournamentsItemMetrics

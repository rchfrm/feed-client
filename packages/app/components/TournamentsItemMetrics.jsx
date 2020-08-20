import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/contexts/ArtistContext'

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

const TournamentsItemMetrics = ({ adMetrics, isAdPair, className }) => {
  const { artistCurrency: currency } = React.useContext(ArtistContext)
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
      {adMetrics.map(({ dataType, tooltip, a, b }) => {
        const { value: valueA } = a
        const { value: valueB, percent: percentB } = b || {}
        const valueAFormatted = dataType === 'spend' ? formatCurrency(valueA, currency)
          : formatNumber(valueA)
        const valueBFormatted = dataType === 'spend' ? formatCurrency(valueB, currency)
          : formatNumber(valueB)
        return (
          <div key={dataType} className="relative mb-4 last:mb-0">
            {/* DATA TITLE */}
            <div className="text-sm mb-1">
              <span className="inline-block">
                {a.name}
              </span>
              {/* TOOLTIP */}
              {tooltip && (
                <TooltipButton
                  copy={tooltip}
                  direction="top"
                  buttonClasses="inline-block relative z-10"
                  buttonStyle={{
                    transform: 'translateY(0.74em)',
                  }}
                />
              )}
            </div>
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
  className: PropTypes.string,
}

TournamentsItemMetrics.defaultProps = {
  className: '',
}


export default TournamentsItemMetrics

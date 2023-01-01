import React from 'react'
import moment from 'moment'
import useHover from '@/app/hooks/useHover'
import { formatCurrency } from '@/helpers/utils'

const ResultsSpendBlock = ({ value, date, currency }) => {
  const [hoverRef, isHover] = useHover()
  const valueString = formatCurrency(value, currency)

  return (
    <div
      className={[
        'relative shrink-0 cursor-pointer',
        'mr-1 mb-1 rounded-dialogue',
        value ? 'bg-green' : 'bg-grey-1',
      ].join(' ')}
      style={{ width: '29px', height: '29px' }}
      ref={hoverRef}
    >
      {isHover && (
        <div
          className="absolute transform -translate-x-1/2 border-solid text-xs bg-white border-2 border-black py-1 p-2 z-10 rounded-dialogue text-center"
          style={{ top: '120%', left: '50%' }}
        >
          <span
            className="absolute transform -translate-x-1/2 w-px h-2 bg-black"
            style={{ bottom: '100%', left: '50%', width: '2px' }}
          />
          {valueString}
          <div className="whitespace-nowrap font-bold">{moment(date).format('D MMM \'YY')}</div>
        </div>
      )}
    </div>
  )
}

ResultsSpendBlock.propTypes = {

}

export default ResultsSpendBlock

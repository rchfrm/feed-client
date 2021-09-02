import React from 'react'

import { formatCurrency } from '@/helpers/utils'

const ResultsSpendBlock = ({ value, currency }) => {
  const [isHovering, setIsHovering] = React.useState(false)
  const valueString = formatCurrency(value, currency)

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMousLeave = () => {
    setIsHovering(false)
  }
  return (
    <div
      className={[
        'relative cursor-pointer',
        'h-8 w-8 mr-1 rounded-dialogue',
        value ? 'bg-green' : 'bg-grey-1',
      ].join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMousLeave}
    >
      {isHovering && (
        <div
          className="absolute transform -translate-x-1/2 border-solid text-xs border-2 border-black py-1 p-2 rounded-dialogue"
          style={{ top: '120%', left: '50%' }}
        >
          <span
            className="absolute transform -translate-x-1/2 w-px h-2 bg-black"
            style={{ bottom: '100%', left: '50%', width: '2px' }}
          />
          {valueString}
        </div>
      )}
    </div>
  )
}

ResultsSpendBlock.propTypes = {

}

export default ResultsSpendBlock

import React from 'react'
import brandColors from '@/constants/brandColors'
import useOnResize from '@/hooks/useOnResize'
import PropTypes from 'prop-types'

export default function PricingPageAdSpendCircle({
  amount,
  color,
  className,
  diameter,
  setDiameter,
}) {
  const circle = React.useRef(null)
  const { width } = useOnResize()
  React.useEffect(() => {
    if (!setDiameter) return
    setDiameter(circle.current.clientHeight)
  }, [width, setDiameter])
  return (
    <div
      className={className}
      style={{
        height: `${diameter}px`,
        width: setDiameter ? 'initial' : `${diameter}px`,
      }}
    >
      <svg
        fill={brandColors[color]}
        ref={circle}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
      <div
        className={[
          'h-full',
          'relative',
          'flex',
          'justify-center',
          'items-center',
          'text-white',
          'flex-col',
          'text-center',
        ].join(' ')}
        style={{
          top: '-100%',
        }}
      >
        <h1 className="mb-0">£{amount}</h1>
        <h4 className="mb-0">Facebook &amp; Instagram<br />promotion</h4>
      </div>
    </div>
  )
}

PricingPageAdSpendCircle.propTypes = {
  amount: PropTypes.number.isRequired,
  color: PropTypes.string,
  diameter: PropTypes.number.isRequired,
  setDiameter: PropTypes.func.isRequired,
}

PricingPageAdSpendCircle.defaultProps = {
  color: 'redLight',
}

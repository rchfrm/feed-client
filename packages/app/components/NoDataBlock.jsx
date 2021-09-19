import React from 'react'
import PropTypes from 'prop-types'

const NoDataBlock = ({ className, children, sizeRatio }) => {
  return (
    <div
      className={[
        className,
        'relative w-full',
        'bg-grey-1',
      ].join(' ')}
      style={{ paddingBottom: `${sizeRatio * 100}%` }}
    >
      <div className="absolute w-full h-full flex flex-column items-center justify-center">
        {children}
      </div>
    </div>
  )
}

NoDataBlock.propTypes = {
  className: PropTypes.string,
  sizeRatio: PropTypes.number,
}

NoDataBlock.defaultProps = {
  className: null,
  sizeRatio: 3 / 2,
}

export default NoDataBlock

import React from 'react'
import PropTypes from 'prop-types'

const NoDataBlock = ({ className, children }) => {
  return (
    <div
      className={[
        className,
        'relative w-full',
        'bg-grey-1',
      ].join(' ')}
      style={{ paddingBottom: '150%' }}
    >
      <div className="absolute w-full min-h-full flex flex-column items-center justify-center">
        {children}
      </div>
    </div>
  )
}

NoDataBlock.propTypes = {
  className: PropTypes.string,
}

NoDataBlock.defaultProps = {
  className: null,
}

export default NoDataBlock

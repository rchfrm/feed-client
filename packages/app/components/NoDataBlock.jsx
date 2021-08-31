import React from 'react'
import PropTypes from 'prop-types'

const NoDataBlock = ({ className, children }) => {
  return (
    <div className={[
      className,
      'w-full h-full',
      'flex flex-column items-center justify-center',
      'px-20',
      'bg-grey-1',
    ].join(' ')}
    >
      {children}
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

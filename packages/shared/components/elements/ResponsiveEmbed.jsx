import React from 'react'
import PropTypes from 'prop-types'

const ResponsiveEmbed = ({
  className,
  style,
  ratio,
  children,
}) => {
  const childrenMod = React.cloneElement(children, { style: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  } })

  return (
    <div
      className={[
        'relative w-full',
        className,
      ].join(' ')}
      style={{
        ...style,
        paddingTop: `${(1 / ratio) * 100}%`,
      }}
    >
      {childrenMod}
    </div>
  )
}

ResponsiveEmbed.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  ratio: PropTypes.number,
  children: PropTypes.node.isRequired,
}

ResponsiveEmbed.defaultProps = {
  className: null,
  style: {},
  ratio: 16 / 9,
}

export default ResponsiveEmbed

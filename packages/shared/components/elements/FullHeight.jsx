import React from 'react'
import PropTypes from 'prop-types'

import useBrowserStore from '@/hooks/useBrowserStore'

const FullHeight = React.forwardRef(({ id, className, heightPercent, Element, children }, ref) => {
  const { height: windowHeight } = useBrowserStore()
  const [style, setStyle] = React.useState({})
  React.useEffect(() => {
    if (!windowHeight) return
    const style = { height: windowHeight * (heightPercent / 100) }
    window.requestAnimationFrame(() => {
      setStyle(style)
    })
  }, [windowHeight, heightPercent])

  return (
    <Element
      id={id}
      className={className}
      style={style}
      ref={ref}
    >
      {children}
    </Element>
  )
})

FullHeight.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  heightPercent: PropTypes.number,
  Element: PropTypes.string,
  children: PropTypes.node,
}

FullHeight.defaultProps = {
  id: '',
  className: '',
  heightPercent: 100,
  Element: 'div',
  children: <></>,
}

FullHeight.displayName = 'FullHeight'

export default FullHeight

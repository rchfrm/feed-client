import React from 'react'

const useHover = () => {
  const [isHover, setIsHover] = React.useState(false)
  const ref = React.useRef(null)

  const handleMouseOver = () => {
    setIsHover(true)
  }

  const handleMouseOut = () => {
    setIsHover(false)
  }

  React.useEffect(() => {
    const node = ref.current

    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)

      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [])

  return [ref, isHover]
}

export default useHover

import React from 'react'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

const useScrollToButton = (buttonOptions, currentButton) => {
  // DEFINE REFS
  const [buttonRefs, setButtonRefs] = React.useState([])
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin)
  }, [])

  // Update button refs
  React.useEffect(() => {
    setButtonRefs((buttonRefs) => (
      Array(buttonOptions.length).fill().map((_, i) => buttonRefs[i] || React.createRef())
    ))
  }, [buttonOptions.length])

  // Trigger scroll
  // SCROLL TO SELECTED BUTTON when changing platform
  React.useEffect(() => {
    const buttonIndex = buttonOptions.findIndex(({ id }) => id === currentButton)
    const { current: button } = buttonRefs[buttonIndex] || {}
    if (! button) return
    const { current: container } = containerRef
    const { width: containerWidth, left: containerLeft } = container.getBoundingClientRect()
    const { width: buttonWidth, left: buttonLeft } = button.getBoundingClientRect()
    const buttonOffset = buttonLeft - containerLeft
    const newButtonOffset = containerWidth - buttonWidth
    const offsetMod = buttonOffset - newButtonOffset
    const scrollTo = container.scrollLeft + offsetMod
    gsap.to(container, { duration: 0.3, scrollTo: { x: scrollTo } })
  }, [currentButton, buttonRefs, buttonOptions])

  // Return refs
  return [buttonRefs, containerRef]
}

export default useScrollToButton

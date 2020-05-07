import React from 'react'

const useScrollToButton = (buttonOptions, currentButton) => {
  // DEFINE REFS
  const [buttonRefs, setButtonRefs] = React.useState([])
  const containerRef = React.useRef(null)

  // Update button refs
  React.useEffect(() => {
    setButtonRefs(buttonRefs => (
      Array(buttonOptions.length).fill().map((_, i) => buttonRefs[i] || React.createRef())
    ))
  }, [buttonOptions.length])

  // Trigger scroll
  // SCROLL TO SELECTED BUTTON when changing platform
  React.useEffect(() => {
    const buttonIndex = buttonOptions.findIndex(({ id }) => id === currentButton)
    const { current: button } = buttonRefs[buttonIndex] || {}
    if (!button) return
    const { current: container } = containerRef
    const { width: containerWidth, left: containerLeft } = container.getBoundingClientRect()
    const { width: buttonWidth, left: buttonLeft } = button.getBoundingClientRect()
    const buttonOffset = buttonLeft - containerLeft
    const newButtonOffset = containerWidth - buttonWidth
    const offsetMod = buttonOffset - newButtonOffset
    container.scrollLeft += offsetMod
  }, [currentButton])

  // Return refs
  return [buttonRefs, containerRef]
}

export default useScrollToButton

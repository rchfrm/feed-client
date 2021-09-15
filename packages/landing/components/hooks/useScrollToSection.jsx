import React from 'react'

const easeOutQuad = (t) => {
  return t * (2 - t)
}

const scroll = ({ scrollTo, duration, startPos, startTime, callback = () => {} }) => {
  const now = 'now' in window.performance ? performance.now() : new Date().getTime()
  const time = Math.min(1, ((now - startTime) / duration))
  const timeFunction = easeOutQuad(time)
  window.scroll(0, Math.ceil((timeFunction * (scrollTo - startPos)) + startPos))

  if (window.pageYOffset === scrollTo) {
    if (callback) {
      callback()
    }
    return
  }

  requestAnimationFrame(() => {
    scroll({ scrollTo, duration, startPos, startTime, callback })
  })
}

const runScroll = ({ destination, duration }) => {
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
  const startPos = window.pageYOffset
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime()
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop
  const scrollTo = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)
  scroll({ scrollTo, duration, startPos, startTime })
}

const useScrollToSection = ({ targetId = '', offset = 0, duration = 300 }) => {
  const scrollTo = React.useCallback((e) => {
    e.preventDefault()
    const headerEl = document.getElementById('header')
    const el = document.getElementById(targetId)
    const { height: headerHeight } = headerEl.getBoundingClientRect()
    const elOffset = el.offsetTop
    const destination = elOffset + offset - headerHeight
    // document.documentElement.scrollTop = scrollTo
    runScroll({ destination, duration })
  }, [targetId, offset, duration])

  return scrollTo
}

export default useScrollToSection

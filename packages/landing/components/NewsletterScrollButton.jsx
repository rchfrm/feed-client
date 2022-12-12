import React from 'react'
import PropTypes from 'prop-types'

import useScrollToEl from '@/landing/hooks/useScrollToEl'
import useAnimateOnMount from '@/landing/hooks/useAnimateOnMount'
import useOnScroll from '@/landing/hooks/useOnScroll'

const NewsletterScrollButton = ({
  newsletterEl,
  buttonText,
  isFixed,
  visibleAfterScroll,
  className,
  style,
}) => {
  // GET SCROLL TO FUNCTION
  const scrollToEl = useScrollToEl()

  // HANDLE VISIBILITY
  const [isVisible, setIsVisible] = React.useState(false)
  const { scrollTop } = useOnScroll({})
  React.useEffect(() => {
    const showButton = scrollTop > visibleAfterScroll
    setIsVisible(showButton)
  }, [scrollTop, visibleAfterScroll])

  // ANIMATE BUTTON IN/OUT
  // Define animation config
  const animateToFrom = {
    y: { from: 10, to: 0 },
    opacity: { from: 0, to: 1 },
  }
  // Setup animation hook
  const animatedEl = useAnimateOnMount({
    animateToFrom,
    animationOptions: {
      duration: [0.3, 0.2],
      ease: ['power2.out', 'power1.out'],
    },
    initial: 'hidden',
  })
  // Trigger animation
  React.useEffect(() => {
    // SHOW CONTENT
    if (isVisible) return animatedEl.showPresence()
    animatedEl.hidePresence()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  // UNSTICK (when footer comes into view)
  const buttonEl = React.useRef(null)
  const [unstick, setUnstick] = React.useState(false)
  const [unstickAt, setUnstickAt] = React.useState(0)
  React.useEffect(() => {
    if (! newsletterEl) return
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      setUnstick(entry.isIntersecting)
      if (entry.isIntersecting && buttonEl.current) {
        const footerOffset = newsletterEl.offsetTop
        const buttonHeight = buttonEl.current.offsetHeight
        setUnstickAt(footerOffset - buttonHeight)
      }
    })
    observer.observe(newsletterEl)
    return () => observer.disconnect()
  }, [newsletterEl])

  return (
    <>
      {animatedEl.isRendered && (
      <div
        ref={animatedEl.ref}
        className={[
          className,
          isFixed ? 'fixed z-20' : null,
        ].join(' ')}
        style={{
          right: '2rem',
          bottom: '0',
          marginBottom: '2rem',
          ...(isFixed && unstick && {
            position: 'absolute',
            top: unstickAt,
            marginTop: '-2rem',
          }),
          ...style,
        }}
      >
        <button
          ref={buttonEl}
          className="flex items-center bg-green h-14 px-5 rounded-button"
          onClick={() => {
            const headerHeight = document.getElementById('header').offsetHeight
            scrollToEl({ el: newsletterEl, offset: -headerHeight })
          }}
        >
          <strong style={{ marginTop: '-0.12em' }}>
            {buttonText}
          </strong>
        </button>
      </div>
      )}
    </>
  )
}

NewsletterScrollButton.propTypes = {
  newsletterEl: PropTypes.any,
  buttonText: PropTypes.string,
  isFixed: PropTypes.bool,
  className: PropTypes.string,
  visibleAfterScroll: PropTypes.number,
  style: PropTypes.object,
}

NewsletterScrollButton.defaultProps = {
  newsletterEl: null,
  buttonText: 'Join our newsletter',
  isFixed: false,
  className: null,
  visibleAfterScroll: 200,
  style: null,
}

export default NewsletterScrollButton

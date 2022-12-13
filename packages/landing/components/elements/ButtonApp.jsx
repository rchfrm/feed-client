import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/landing/elements/Spinner'

import track from '@/landing/helpers/trackingHelpers'

import { getLinkType } from '@/landing/helpers/utils'

const ButtonApp = React.forwardRef(({
  version,
  disabled,
  type,
  success,
  loading,
  className,
  style,
  onClick,
  href,
  target,
  isExternalLink,
  wrapper,
  icon,
  label,
  children,
}, ref) => {
  const versions = version
    .split(' ')
    .map((versionString) => `button--${versionString}`)
  versions.push('button--basic')

  if (icon) {
    versions.push('button--icon')
  }
  // Define classes
  const classes = ['button', ...versions]
  if (className) {
    classes.push(className)
  }
  if (success) {
    classes.push('button--success')
  }
  if (loading) {
    classes.push('_loading')
  }

  // Define wrapper type based on href or not
  const Wrapper = wrapper || (href ? 'a' : 'button')
  // Handle hrefs
  const linkType = href ? getLinkType(href) : null
  const targetType = linkType === 'external' && ! target ? '_blank' : '_self'
  const rel = linkType === 'external' ? 'noopener noreferrer' : null

  // ON CLICK
  const onButtonClick = React.useCallback((e) => {
    if (! isExternalLink) {
      track({
        action: 'button_click',
        category: 'generic',
        label,
      })
    }
    onClick(e)
  }, [onClick, label, isExternalLink])

  // OUTPUT BUTTON
  return (
    <Wrapper
      type={href ? null : type}
      disabled={disabled}
      className={classes.join(' ')}
      onClick={onButtonClick}
      href={href}
      target={href ? targetType : ''}
      rel={href ? rel : ''}
      style={style}
      ref={ref}
      aria-label={label}
    >
      {loading && <Spinner className="button--spinner" />}
      <span className="button--innerText">
        {icon ? (
          <span className="flex grow text-center items-center w-full">
            {icon}
            <span className="grow">{children}</span>
          </span>
        ) : children}
      </span>
    </Wrapper>
  )
})

ButtonApp.displayName = 'ButtonApp'

ButtonApp.propTypes = {
  version: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  href: PropTypes.string,
  target: PropTypes.string,
  isExternalLink: PropTypes.bool,
  wrapper: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ButtonApp.defaultProps = {
  version: 'black',
  disabled: false,
  type: 'button',
  success: false,
  loading: false,
  style: {},
  className: '',
  href: null,
  target: '',
  isExternalLink: false,
  wrapper: '',
  icon: null,
  label: '',
  onClick: () => {},
}

export default ButtonApp

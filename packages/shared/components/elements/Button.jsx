import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '@/elements/Spinner'
import { track } from '@/helpers/trackingHelpers'
import { getStringFromChildrenProp, getLinkType } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const Button = React.forwardRef(({
  type,
  size,
  color,
  version,
  children,
  onClick,
  isLoading,
  isDisabled,
  isSidePanel,
  trackComponentName,
  className,
  href,
  spinnerFill,
  id,
}, ref) => {
  const classes = {
    'x-small': 'h-[22px] p-2 text-xs',
    small: 'h-8 p-2 text-[13px]',
    medium: 'h-12 p-3 text-[13px]',
    large: 'h-12 p-3.5',
    green: {
      primary: 'bg-green border-green hover:bg-green-light hover:border-green-light active:border-green-dark active:border-dashed disabled:bg-grey disabled:border-grey',
      secondary: 'bg-white border-green hover:bg-green-bg-light active:bg-green-bg-light active:border-green-dark disabled:border-grey-dark disabled:bg-white',
      tertiary: 'bg-green-bg-light border-green-bg-light hover:bg-green-bg-dark hover:border-green-bg-dark active:border-green-dark active:border-dashed disabled:bg-grey-light disabled:border-grey-light',
    },
    yellow: {
      primary: 'bg-yellow border-yellow hover:bg-yellow-light hover:border-yellow-light active:border-yellow-dark active:border-dashed disabled:bg-grey disabled:border-grey',
      secondary: 'bg-white border-yellow hover:bg-yellow-bg-light active:bg-yellow-bg-light active:border-yellow-dark disabled:border-grey-dark disabled:bg-white',
      tertiary: 'bg-yellow-bg-light border-yellow-bg-light hover:bg-yellow-bg-dark hover:border-yellow-bg-dark active:border-yellow-dark active:border-dashed disabled:bg-grey-light disabled:border-grey-light',
    },
    red: {
      primary: 'bg-red border-red hover:bg-red-light hover:border-red-light active:border-red-dark active:border-dashed disabled:bg-grey disabled:border-grey',
      secondary: 'bg-white border-red hover:bg-red-bg-light active:bg-red-bg-light active:border-red-dark disabled:border-grey-dark disabled:bg-white',
      tertiary: 'bg-red-bg-light border-red-bg-light hover:bg-red-bg-dark hover:border-red-bg-dark active:border-red-dark active:border-dashed disabled:bg-grey-light disabled:border-grey-light',
    },
    text: 'underline',
  }

  const onButtonClick = (e) => {
    const buttonText = getStringFromChildrenProp(children)

    track('button_click', {
      buttonText,
      componentName: trackComponentName,
    })

    onClick(e)
  }

  const isTextButton = version === 'text'
  const Tag = href ? 'a' : 'button'
  const linkType = href ? getLinkType(href) : null
  const target = linkType === 'external' ? '_blank' : '_self'
  const rel = linkType === 'external' ? 'noopener noreferrer' : null

  return (
    <Tag
      type={type}
      onClick={onButtonClick}
      className={[
        ! isTextButton ? ['flex justify-center items-center rounded-dialogue border-2 border-solid', classes[size], classes[color][version]].join(' ') : classes[version],
        isLoading ? 'relative' : null,
        href ? 'no-underline' : null,
        isSidePanel ? 'w-full rounded-t-none rounded-br-none' : null,
        isDisabled ? 'cursor-not-allowed' : null,
        className,
      ].join(' ')}
      disabled={isDisabled}
      href={href}
      target={href ? target : ''}
      rel={href ? rel : ''}
      ref={ref}
      id={id}
    >
      {isLoading && (
        <Spinner
          width={size === 'small' ? 15 : 20}
          fill={spinnerFill}
          className="absolute left-1/2 -translate-x-1/2"
        />
      )}
      <span
        className={[
          'flex items-center',
          ! isTextButton ? 'font-bold' : null,
          isDisabled ? 'opacity-50' : null,
          isLoading ? 'invisible' : null,
          href ? 'text-black hover:text-black' : null,
        ].join(' ')}
      >
        {children}
      </span>
    </Tag>
  )
})

Button.displayName = 'Button'

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  version: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSidePanel: PropTypes.bool,
  className: PropTypes.string,
  href: PropTypes.string,
  spinnerFill: PropTypes.string,
  id: PropTypes.string,
  trackComponentName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  type: 'button',
  size: 'large',
  color: 'green',
  version: 'primary',
  onClick: () => {},
  isDisabled: false,
  isLoading: false,
  isSidePanel: false,
  className: '',
  href: '',
  spinnerFill: brandColors.black,
  id: '',
}

export default Button

import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '@/elements/Spinner'
import { track } from '@/helpers/trackingHelpers'
import { getStringFromChildrenProp } from '@/helpers/utils'
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
}, ref) => {
  const isTextButton = version === 'text'

  const classes = {
    small: 'h-8 p-2 text-[13px]',
    medium: 'h-12 p-3 text-[13px]',
    large: 'h-12 p-3.5',
    green: {
      primary: 'bg-green hover:bg-green-light active:border-2 active:border-green-dark active:border-dashed disabled:bg-grey',
      secondary: 'bg-offwhite border-green border-solid border-2 hover:bg-green-bg-light active:border-4 active:bg-green-bg-light disabled:border-grey-dark disabled:bg-offwhite',
      tertiary: 'bg-green-bg-light hover:bg-green-bg-dark active:border-2 active:border-green-dark active:border-dashed disabled:bg-grey-light',
    },
    yellow: {
      primary: 'bg-yellow hover:bg-yellow-light active:border-2 active:border-yellow-dark active:border-dashed disabled:bg-grey',
      secondary: 'bg-offwhite border-yellow border-solid border-2 hover:bg-yellow-bg-light active:border-4 active:bg-yellow-bg-light disabled:border-grey-dark disabled:bg-offwhite',
      tertiary: 'bg-yellow-bg-light hover:bg-yellow-bg-dark active:border-2 active:border-yellow-dark active:border-dashed disabled:bg-grey-light',
    },
    red: {
      primary: 'bg-red hover:bg-red-light active:border-2 active:border-red-dark active:border-dashed disabled:bg-grey',
      secondary: 'bg-offwhite border-red border-solid border-2 hover:bg-red-bg-light active:border-4 active:bg-red-bg-light disabled:border-grey-dark disabled:bg-offwhite',
      tertiary: 'bg-red-bg-light hover:bg-red-bg-dark active:border-2 active:border-red-dark active:border-dashed disabled:bg-grey-light',
    },
    text: 'inline',
  }

  const onButtonClick = (e) => {
    const buttonText = getStringFromChildrenProp(children)

    track('button_click', {
      buttonText,
      componentName: trackComponentName,
    })

    onClick(e)
  }

  return (
    <button
      type={type}
      onClick={onButtonClick}
      className={[
        isLoading ? 'relative' : null,
        'rounded-dialogue',
        classes[color][version],
        ! isTextButton ? classes[size] : null,
        ! isTextButton ? 'flex justify-center items-center' : 'underline',
        isSidePanel ? 'w-full rounded-t-none rounded-br-none' : null,
        isDisabled ? 'cursor-not-allowed' : null,
        className,
      ].join(' ')}
      disabled={isDisabled}
      href={href}
      ref={ref}
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
        ].join(' ')}
      >
        {children}
      </span>
    </button>
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
}

export default Button

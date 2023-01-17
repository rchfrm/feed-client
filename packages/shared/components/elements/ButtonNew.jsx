import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '@/elements/Spinner'
import { track } from '@/helpers/trackingHelpers'
import { getStringFromChildrenProp } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const Button = ({
  type,
  version,
  size,
  children,
  onClick,
  isLoading,
  isDisabled,
  componentName,
  className,
}) => {
  const isTextButton = version === 'text'

  const classes = {
    size: {
      small: 'h-8 p-2 text-[13px]',
      medium: 'h-12 p-3 text-[13px]',
      large: 'h-12 w-auto p-3.5',
    },
    version: {
      primary: `
        bg-green
        hover:bg-green-light
        active:border-2 active:border-green-dark active:border-dashed
        disabled:bg-grey
      `,
      secondary: `
        border-green border-solid border-2
        hover:bg-green-bg-light
        active:border-4 active::bg-green-bg-light
        disabled:border-grey-dark disabled:bg-offwhite
      `,
      tertiary: `
        bg-green-bg-light
        hover:bg-green-bg-dark
        active:border-2 active:border-green-dark active:border-dashed
        disabled:bg-grey-light
      `,
      text: 'inline',
    },
  }

  const onButtonClick = (e) => {
    const buttonText = getStringFromChildrenProp(children)

    track('button_click', {
      buttonText,
      componentName,
    })

    onClick(e)
  }

  return (
    <button
      type={type}
      onClick={onButtonClick}
      className={[
        'relative',
        'rounded-dialogue',
        classes.version[version],
        ! isTextButton ? classes.size[size] : null,
        ! isTextButton ? 'flex justify-center items-center' : null,
        isDisabled ? 'cursor-not-allowed' : null,
        className,
      ].join(' ')}
      disabled={isDisabled}
    >
      {isLoading && (
        <Spinner
          width={size === 'small' ? 15 : 20}
          fill={brandColors.black}
          className="absolute left-1/2 -translate-x-1/2"
        />
      )}
      <span
        className={[
          'flex items-center',
          isTextButton ? 'underline' : 'font-bold',
          isDisabled ? 'opacity-50' : null,
          isLoading ? 'invisible' : null,
        ].join(' ')}
      >
        {children}
      </span>
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  version: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  componentName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  type: 'button',
  version: 'primary',
  size: 'medium',
  isDisabled: false,
  isLoading: false,
  className: '',
}

export default Button

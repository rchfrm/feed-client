import React from 'react'
import PropTypes from 'prop-types'

import CaretIcon from '@/icons/CaretIcon'

import { capitalise } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const DropdownPill = ({
  items,
  selectedItem,
  handleItemClick,
  className,
  disabled,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)

  const close = ({ target }) => {
    if (! dropdownRef.current) return
    // Don't close if clicking on dropdown button or items
    if (dropdownRef.current.contains(target)) return

    setIsOpen(false)
  }

  const onClick = (item) => {
    handleItemClick(item)
    setIsOpen(false)
  }

  // Listen to clicks outside dropdown to handle close
  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', close)
      return
    }
    window.removeEventListener('click', close)

    return () => {
      window.removeEventListener('click', close)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(! isOpen)}
        className={[
          'flex items-center',
          'px-2 py-1 text-xs',
          'border-2 border-solid rounded-full',
          disabled ? 'pointer-events-none border-grey text-grey' : null,
          className,
        ].join(' ')}
      >
        {capitalise(selectedItem)}
        <div className={[
          'ml-1',
          'transition-transform duration-100 transform origin-center',
          isOpen ? 'rotate-90' : null,
        ].join(' ')}
        >
          <CaretIcon
            direction="right"
            fill={disabled ? brandColors.grey : undefined}
            className="w-2 h-2"
          />
        </div>
      </button>
      {isOpen && (
        <ul
          className={[
            'absolute z-10 top-2 left-2 py-1 px-2',
            'border-2 border-solid border-black',
            'bg-offwhite rounded-dialogue',
          ].join(' ')}
        >
          {items.map((item) => (
            <li key={item}>
              <button
                onClick={() => onClick(item)}
                className="text-xs"
              >
                {capitalise(item)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

DropdownPill.propTypes = {
  items: PropTypes.array.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  selectedItem: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

DropdownPill.defaultProps = {
  className: null,
  disabled: false,
}

export default DropdownPill

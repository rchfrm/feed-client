import React from 'react'
import PropTypes from 'prop-types'
import CaretIcon from '@/icons/CaretIcon'
import { capitalise } from '@/helpers/utils'

const Dropdown = ({
  children,
  items,
  handleItemClick,
  className,
  buttonClassName,
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
    <div className={[className, 'relative'].join(' ')} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(! isOpen)}
        className={[
          buttonClassName,
          'flex items-center',
          disabled ? 'pointer-events-none' : null,
        ].join(' ')}
      >
        {! disabled && (
          <div className={[
            'transition-transform duration-100 transform origin-center',
            isOpen ? 'rotate-90' : null,
          ].join(' ')}
          >
            <CaretIcon
              direction="right"
              className="w-7 h-auto"
            />
          </div>
        )}
        {children}
      </button>
      {isOpen && (
        <ul
          className={[
            'absolute z-10 top-2 left-2 p-2',
            'border-2 border-solid border-black',
            'bg-offwhite rounded-dialogue',
          ].join(' ')}
        >
          {items.map((item) => (
            <li key={item} className="mb-1 last:mb-0">
              <button
                onClick={() => onClick(item)}
                className="font-semibold"
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

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
}

Dropdown.defaultProps = {
  className: null,
  buttonClassName: null,
}

export default Dropdown

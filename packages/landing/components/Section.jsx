import PropTypes from 'prop-types'

const Section = ({ children, className, isFullWidth }) => {
  return (
    <section
      className={[
        'p-4',
        'minContent:p-6',
        isFullWidth ? '' : 'md:max-w-screen-lg md:mx-auto',
        className,
      ].join(' ')}
    >
      { children }
    </section>
  )
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isFullWidth: PropTypes.bool,
}

Section.defaultProps = {
  className: '',
  isFullWidth: false,
}

export default Section

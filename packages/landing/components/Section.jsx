import PropTypes from 'prop-types'

const Section = ({ children, className, fullWidth }) => {
  return (
    <section
      className={[
        'p-4',
        'minContent:p-6',
        fullWidth ? '' : 'md:max-w-screen-lg md:mx-auto',
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
  fullWidth: PropTypes.bool,
}

Section.defaultProps = {
  className: '',
  fullWidth: false,
}

export default Section

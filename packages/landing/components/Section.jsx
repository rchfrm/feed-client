import PropTypes from 'prop-types'

const Section = ({ children, className, fullWidth, id }) => {
  return (
    <section
      id={id}
      className={[
        !fullWidth ? 'px-5' : null,
        !fullWidth ? 'xs:px-8' : null,
        'py-15',
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
  id: PropTypes.string,
}

Section.defaultProps = {
  className: '',
  fullWidth: false,
  id: null,
}

export default Section

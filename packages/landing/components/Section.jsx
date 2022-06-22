import PropTypes from 'prop-types'

const Section = ({ children, className, fullWidth, id }) => {
  const standardWidthClasses = ['px-5', 'xs:px-8', 'max-w-[1200px]', 'mx-auto'].join(' ')
  return (
    <section
      id={id}
      className={[
        !fullWidth ? standardWidthClasses : null,
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

import PropTypes from 'prop-types'

const Section = ({ children, className }) => {
  return (
    <section
      className={[
        'p-4',
        'minContent:p-6',
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
}

Section.defaultProps = {
  className: '',
}

export default Section

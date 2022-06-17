import PropTypes from 'prop-types'

const Section = ({ children }) => {
  return (
    <section
      className={[
        'px-5',
        'xs:px-8',
        'py-10',
      ].join(' ')}
    >
      <div className={['grid', 'grid-cols-12', 'xs:gap-4'].join(' ')}>
        { children }
      </div>
    </section>
  )
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Section

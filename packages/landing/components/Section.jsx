import PropTypes from 'prop-types'

const Section = ({ children }) => {
  return (
    <section className="section--padding lg">
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

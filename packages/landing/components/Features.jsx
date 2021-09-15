import PropTypes from 'prop-types'

import FeatureItem from '@/FeatureItem'

import * as styles from './Features.module.css'

const Features = ({ features }) => {
  return (
    <section
      id="features"
      className={[
        'section--padding',
        'bmw',
      ].join(' ')}
    >
      <ul
        className={[
          styles.featuresList,
        ].join(' ')}
      >
        {features.map((feature) => {
          const { id, header, copy, image } = feature
          return (
            <FeatureItem
              key={id}
              header={header}
              copy={copy}
              image={image}
              className={[
                styles.featureItem,
              ].join(' ')}
            />
          )
        })}
      </ul>
    </section>
  )
}

Features.propTypes = {
  features: PropTypes.array.isRequired,
}

export default Features

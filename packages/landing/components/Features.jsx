import PropTypes from 'prop-types'

import FeatureItem from '@/landing/FeatureItem'

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
                'mb-16',
                'flex',
                'flex-col',
                'items-center',
                'xs:px-8',
                'sm:flex-row',
                'sm:even:flex-row-reverse',
                'sm:p-0',
                'sm:justify-evenly',
                'sm:last:mb-0',
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

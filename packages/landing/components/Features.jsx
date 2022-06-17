import PropTypes from 'prop-types'

import FeatureItem from '@/landing/FeatureItem'
import Section from '@/landing/Section'

const Features = ({ features }) => {
  return (
    <Section
      id="features"
      className="bmw"
    >
      <ul
        className={[
          'text-xl',
          'sm:text-base',
          'md:p-5',
          'md:text-xl',
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
    </Section>
  )
}

Features.propTypes = {
  features: PropTypes.array.isRequired,
}

export default Features

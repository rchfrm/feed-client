import PropTypes from 'prop-types'

import FeatureItem from '@/landing/FeatureItem'
import Section from '@/landing/Section'

const Features = ({ features }) => {
  return (
    <Section id="features">
      <ul
        className={[
          'flex',
          'flex-column',
          'mb-0',
          'gap-y-8',
          'text-xl',
          'md:p-5',
          'md:text-xl',
        ].join(' ')}
      >
        {features.map((feature, index) => {
          const { id, header, copy, image } = feature
          return (
            <FeatureItem
              key={id}
              index={index}
              header={header}
              copy={copy}
              image={image}
              className={[
                'flex',
                'flex-col',
                'items-center',
                'sm:grid',
                'sm:grid-cols-2',
                'sm:gap-x-15',
                'sm:even:flex-row-reverse',
                'sm:justify-between',
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

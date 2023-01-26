import TickIcon from '@/icons/TickIcon'

const FeaturesMobile = ({ features }) => {
  if (features.length === 0) return null
  return (
    <div>
      {features.map((feature, index) => {
        return (
          <div
            key={index}
            className={['flex', 'items-center', 'pb-2'].join(' ')}
          >
            <TickIcon
              className={[
                'fill-current',
                'flex-none',
                'twitter',
                'h-4',
                'w-auto',
              ].join(' ')}
            />
            <p className={['pl-2'].join(' ')}>{feature.title}</p>
          </div>
        )
      })}
    </div>
  )
}

export default FeaturesMobile

import PropTypes from 'prop-types'

export default function HeroStrapLine({ strapLine }) {
  return (
    <h1
      className={[
        'mb-0',
        'font-normal',
        'leading-[1.1]',
        'text-[2rem]',
        'xxs:text-[2.5rem]',
        'minContent:text-5xl',
        'lg:text-6xl',
      ].join(' ')}
    >
      {strapLine}
    </h1>
  )
}

HeroStrapLine.propTypes = {
  strapLine: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
}

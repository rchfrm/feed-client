import PropTypes from 'prop-types'

export default function HeroStrapLine({ strapLine }) {
  const fontSizing = [
    'text-[2rem]',
    'leading-9',
    'minContent:text-5xl',
    'minContent:leading-[1.1]',
    'lg:text-6xl',
  ]
  return (
    <div
      className={[
        'col-span-12',
        'md:col-span-9',
        'py-10',
      ].join(' ')}
    >
      <h1 className={['mb-0', 'font-normal', ...fontSizing].join(' ')}>{strapLine}</h1>
    </div>
  )
}

HeroStrapLine.propTypes = {
  strapLine: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
}

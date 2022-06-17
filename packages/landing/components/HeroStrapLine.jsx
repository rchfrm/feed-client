import PropTypes from 'prop-types'

export default function HeroStrapLine({ partA, partB }) {
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
        'minContent:py-14',
      ].join(' ')}
    >
      <h1 className={['mb-0', 'font-normal', ...fontSizing].join(' ')}>{partA} {partB}</h1>
    </div>
  )
}

HeroStrapLine.propTypes = {
  partA: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  partB: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

HeroStrapLine.defaultProps = {
  partB: null,
}

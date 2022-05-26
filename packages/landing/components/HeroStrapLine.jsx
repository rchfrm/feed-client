import PropTypes from 'prop-types'

export default function HeroStrapLine({ partA, partB }) {
  const fontSizing = [
    'text-3xl',
    'xxs:text-4xl',
    'xs:text-5xl',
  ]
  return (
    <div
      className={[
        'col-span-12',
        'pb-10',
      ].join(' ')}
    >
      {partA && <h1 className={['mb-0', 'font-normal', ...fontSizing].join(' ')}>{partA}</h1>}
      {partB && <h2 className={['border-b-3', 'border-green', 'border-solid', 'inline', ...fontSizing].join(' ')}><strong>{partB}</strong></h2>}
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

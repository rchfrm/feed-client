import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import * as styles from './Hero.module.css'

export default function HeroStrapLine({ strapLine }) {
  return (
    <MarkdownText
      markdown={strapLine}
      className={[
        'mb-0',
        'leading-[1.1]',
        'text-[2rem]',
        'xxs:text-[2.5rem]',
        'minContent:text-5xl',
        'sm:col-span-12',
        'lg:col-span-9',
        'lg:text-6xl',
        styles.heroStrapLineUnderline,
      ].join(' ')}
    />
  )
}

HeroStrapLine.propTypes = {
  strapLine: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
}

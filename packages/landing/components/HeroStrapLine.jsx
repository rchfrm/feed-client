import MarkdownText from '@/elements/MarkdownText'
import * as styles from './Hero.module.css'

const strapLine = 'Make social ads the **easiest part of any artist campaign**'
export default function HeroStrapLine() {
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
        'text-center',
        styles.heroStrapLineUnderline,
      ].join(' ')}
    />
  )
}

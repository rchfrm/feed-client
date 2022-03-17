import * as styles from '@/landing/Hero.module.css'

export default function HeroStrapLine({ partA, partB }) {
  return (
    <div
      className={[
        styles.strapLine,
        'col-span-12',
        'pb-8',
      ].join(' ')}
    >
      {partA && <h1 className={['mb-0', 'font-normal'].join(' ')}>{partA}</h1>}
      {partB && <h2 className={['border-b-3', 'border-green', 'border-solid', 'inline-block'].join(' ')}><strong>{partB}</strong></h2>}
    </div>
  )
}

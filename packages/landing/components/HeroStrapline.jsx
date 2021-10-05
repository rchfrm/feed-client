import * as styles from '@/landing/Hero.module.css'

export default function HeroStrapline({ partA, partB }) {
  return (
    <div
      className={[
        styles.strapline,
        'col-span-12',
        'pb-8',
      ].join(' ')}
    >
      <h1 className={['mb-0', 'font-normal'].join(' ')}>{partA}</h1>
      <h2><strong>{partB}</strong></h2>
    </div>
  )
}

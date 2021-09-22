import MarkdownText from '@/landing/elements/MarkdownText'

export default function HeroDescription({ description }) {
  return (
    <MarkdownText
      className={[
        'text-xl',
        'font-display',
        'col-span-12',
        'row-start-3',
        'col-start-1',

        'sm:text-2xl',

        'mb-12',

        'md:z-10',
        'md:col-end-8',
      ].join(' ')}
      markdown={description}
    />
  )
}

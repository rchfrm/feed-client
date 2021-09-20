import MarkdownText from '@/landing/elements/MarkdownText'

export default function HeroDescription({ description }) {
  return (
    <MarkdownText
      className={[
        'text-2xl',
        'font-display',
        'col-span-12',
        'row-start-3',
        'col-start-1',

        'md:z-10',
        'md:col-end-8',
      ].join(' ')}
      markdown={description}
    />
  )
}

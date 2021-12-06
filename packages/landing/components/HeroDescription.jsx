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
        'mb-12',
        'md:pb-6',
        'bg-white',

        'sm:text-2xl',

        'md:text-xl',
        'md:z-10',
        'md:col-end-6',

        'lg:text-2xl',
      ].join(' ')}
      markdown={description}
    />
  )
}

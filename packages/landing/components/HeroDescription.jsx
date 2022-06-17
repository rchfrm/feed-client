import MarkdownText from '@/landing/elements/MarkdownText'

export default function HeroDescription({ description }) {
  return (
    <MarkdownText
      className={[
        'bg-white',

        'text-xl',
        'sm:text-2xl',
        'md:text-xl',
        'lg:text-2xl',

        'sm:col-start-1',
        'sm:col-span-12',

        'md:row-start-3',

        'md:mr-6',

        'md:z-10',

        'md:col-end-7',
      ].join(' ')}
      markdown={description}
    />
  )
}

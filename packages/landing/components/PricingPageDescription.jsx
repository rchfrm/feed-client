import MarkdownText from '@/elements/MarkdownText'

const PricingPageDescription = ({ copy }) => {
  return (
    <section className={['section--padding', 'bmw'].join(' ')}>

      <div className={['grid', 'grid-cols-12', 'gap-4'].join(' ')}>

        <MarkdownText
          className={[
            'h4',
            'col-span-12',

            'md:col-span-10',
            'md:col-start-2',
          ].join(' ')}
          markdown={copy}
        />

      </div>

    </section>
  )
}

export default PricingPageDescription

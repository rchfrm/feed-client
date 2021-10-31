import VideoEmbed from '@/elements/VideoEmbed'

const IntroVideo = () => {
  return (
    <section
      id="intro-video"
      className={[
        'section--padding',
        'bg-grey-1',
      ].join(' ')}
    >
      <div
        className={[
          'w-full',
          'bmw',
          'grid',
          'grid-cols-12',
          'gap-4',
        ].join(' ')}
      >
        <VideoEmbed
          className={[
            'col-span-12',

            'md:col-span-8',
            'md:col-start-3',

            'lg:col-span-6',
            'lg:col-start-4',
          ].join(' ')}
          video={{
            provider: 'vimeo',
            providerUid: '606336333',
            url: 'https://vimeo.com/606336333',
          }}
        />
      </div>
    </section>
  )
}

export default IntroVideo

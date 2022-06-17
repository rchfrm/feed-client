import VideoEmbed from '@/elements/VideoEmbed'
import Section from '@/landing/Section'

const IntroVideo = () => {
  return (
    <Section
      id="intro-video"
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
    </Section>
  )
}

export default IntroVideo

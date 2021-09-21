import VideoEmbed from '@/landing/elements/VideoEmbed'

const IntroVideo = () => {
  return (
    <section
      id="intro-video"
      className={[
        'section--padding',
        'bmw',
      ].join(' ')}
    >
      <VideoEmbed
        video={{
          provider: 'vimeo',
          providerUid: '606336333',
          url: 'https://vimeo.com/606336333',
        }}
      />
    </section>
  )
}

export default IntroVideo

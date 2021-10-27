import Hero from '@/landing/Hero'

const mobileImage = {
  url: 'https://www.datocms-assets.com/16793/1632393978-screenshots-mobile.png',
  alt: 'Feed Screenshots',
  mimeType: 'image/png',
  width: 1013,
  height: 1013,
  responsiveImage: '{alt: "Feed Screenshots", aspectRatio: 1, base64: "…}',
  focalPoint: '{x: 0.5, y: 0.5}',
}

const desktopImage = {
  url: 'https://www.datocms-assets.com/16793/1632320068-screenshot-diagonal.png',
  alt: 'Feed Screenshots',
  mimeType: 'image/png',
  width: 1525,
  height: 1109,
  responsiveImage: '{alt: "Feed Screenshots", aspectRatio: 1.3751127141…}',
  focalPoint: '{x: 0.5, y: 0.5}',
}

export default function HomePage() {
  return (
    <>
      <Hero
        heroStraplineA="Automated ads for music"
        heroImageDesktop={desktopImage}
        heroCopy="Keep doing you on social media. Connect to Feed, set a budget and we’ll do the rest.\n\nFeed figures out which of your posts get the best response, and leans into those to discover new audiences and grow income."
        heroImageMobile={mobileImage}
        heroStraplineB="that actually work for small budgets."
      />
    </>
  )
}

import { gsap, Power1 } from 'gsap'

// ANIMATE AD
const animateAd = (target, position, tournamentView) => {
  if (!target) return
  console.log('animateAd', target)
  const translateX = tournamentView === 'metrics' ? 80 : 0
  const direction = position === 'left' ? -1 : 1
  // Anim props
  const xPercent = translateX * direction
  const duration = 0.3
  // Animate
  gsap.to(target, { xPercent, duration, ease: Power1.easeOut })
}

const animateTournamentItem = (container, tournamentView) => {
  console.log('tournamentView', tournamentView)
  // GET ELS
  const [leftAd, rightAd] = container.querySelectorAll('.TournamentsItemAd')
  const buttonContainer = container.querySelector('.MetricsButton')
  const metrics = container.querySelector('.TournamentsItemDetails')
  // GET DIMENSIONS
  const containerWidth = container.offsetWidth
  const adWidth = leftAd.offsetWidth
  // ANIMATE ADS
  animateAd(leftAd, 'left', tournamentView)
  animateAd(rightAd, 'right', tournamentView)
  // SHOW METRICS
  if (tournamentView === 'metrics') {
    
    return
  }
  // SHOW ADS
  console.log('buttonContainer', buttonContainer)
}

export default animateTournamentItem

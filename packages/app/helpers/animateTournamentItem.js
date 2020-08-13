import { gsap } from 'gsap'

const durations = {
  ad: 0.3,
  button: 0.4,
  metrics: {
    metrics: { duration: 0.3, delay: 0.25 },
    ads: { duration: 0.1, delay: 0 },
  },
}

// ANIMATE AD
const animateAd = (target, position, tournamentView) => {
  if (!target) return
  const translateX = tournamentView === 'metrics' ? 80 : 0
  const direction = position === 'left' ? -1 : 1
  // Anim props
  const xPercent = translateX * direction
  const duration = durations.ad
  // Animate
  gsap.to(target, { xPercent, duration, ease: 'power1.out' })
}

// ANIMATE BUTTON
const animateButton = ({ buttonContainer, button }, tournamentView) => {
  const yPercent = tournamentView === 'metrics' ? -100 : 0
  const rotation = tournamentView === 'metrics' ? 45 : 0
  const duration = durations.button
  const ease = tournamentView === 'metrics' ? 'back.inOut(1.2)' : 'back.out(1)'
  gsap.to(buttonContainer, { yPercent, duration, ease })
  gsap.to(button, { rotation, duration, ease: 'power1.out' })
}

// ANIMATE METRICS
const toggleMetricsVisible = (target, state) => {
  const display = state ? 'block' : 'none'
  gsap.set(target, { display })
}

const animateMetrics = (target, tournamentView) => {
  if (tournamentView === 'metrics') toggleMetricsVisible(target, true)
  const opacity = tournamentView === 'metrics' ? 1 : 0
  const scaleX = tournamentView === 'metrics' ? 1 : 0.93
  const { duration, delay } = durations.metrics[tournamentView]
  gsap.to(target, { opacity, scaleX, duration, delay, ease: 'power1.out' })
}

// GET ELS
const getEls = (container) => {
  const buttonContainer = container.querySelector('.MetricsButtonContainer')
  return {
    ads: container.querySelectorAll('.TournamentsItemAd'),
    buttonContainer,
    button: buttonContainer.querySelector('.MetricsButton'),
    metrics: container.querySelector('.TournamentsItemDetails'),
  }
}

// ANIMATE WHOLE TOURNAMENT
// ------------------------
export const animateTournamentItem = (container, tournamentView) => {
  // GET ELS
  const { ads, buttonContainer, button, metrics } = getEls(container)
  const [leftAd, rightAd] = ads
  // ANIMATE ADS
  animateAd(leftAd, 'left', tournamentView)
  animateAd(rightAd, 'right', tournamentView)
  // ANIMATE BUTTON
  animateButton({ buttonContainer, button }, tournamentView)
  // ANIMATE METRICS
  animateMetrics(metrics, tournamentView)
}


// RESET FOR DESKTOPS
// ------------------
export const resetTournamentItem = (container) => {
  // Get els
  const { ads, buttonContainer, button, metrics } = getEls(container)
  // Reset Metrics
  gsap.set(metrics, {
    display: 'block',
    opacity: 1,
  })
  // Reset Ads
  gsap.set(ads, {
    xPercent: 0,
  })
  // Reset Button
  gsap.to(buttonContainer, { yPercent: 0 })
  gsap.to(button, { rotation: 0 })
}

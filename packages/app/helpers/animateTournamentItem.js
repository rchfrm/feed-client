import { gsap, Power1 } from 'gsap'

const durations = {
  ad: 0.3,
  button: 0.3,
  metrics: {
    metrics: { duration: 0.4, delay: 0.1 },
    ads: { duration: 0.1, delay: 0 },
  },
}

// ANIMATE AD
const animateAd = (target, position, tournamentView) => {
  if (!target) return
  console.log('animateAd', target)
  const translateX = tournamentView === 'metrics' ? 80 : 0
  const direction = position === 'left' ? -1 : 1
  // Anim props
  const xPercent = translateX * direction
  const duration = durations.ad
  // Animate
  gsap.to(target, { xPercent, duration, ease: Power1.easeOut })
}

// ANIMATE BUTTON
const animateButton = (target, tournamentView) => {
  const yPercent = tournamentView === 'metrics' ? -100 : 0
  const duration = durations.button
  gsap.to(target, { yPercent, duration, ease: Power1.easeOut })
}

// ANIMATE METRICS
const toggleMetricsVisible = (target, state) => {
  const display = state ? 'block' : 'none'
  gsap.set(target, { display })
}

const animateMetrics = (target, tournamentView) => {
  if (tournamentView === 'metrics') toggleMetricsVisible(target, true)
  const opacity = tournamentView === 'metrics' ? 1 : 0
  const scaleX = tournamentView === 'metrics' ? 1 : 0.9
  const { duration, delay } = durations.metrics[tournamentView]
  gsap.to(target, { opacity, scaleX, duration, delay, ease: Power1.easeOut })
}

// ANIMATE WHOLE TOURNAMENT
const animateTournamentItem = (container, tournamentView) => {
  // GET ELS
  const [leftAd, rightAd] = container.querySelectorAll('.TournamentsItemAd')
  const button = container.querySelector('.MetricsButtonContainer')
  const metrics = container.querySelector('.TournamentsItemDetails')
  // TOGGLE CLASS ON CONTAINER
  if (tournamentView === 'metrics') {
    container.classList.add('_metricsOn')
  } else {
    container.classList.remove('_metricsOff')
  }
  // ANIMATE ADS
  animateAd(leftAd, 'left', tournamentView)
  animateAd(rightAd, 'right', tournamentView)
  // ANIMATE BUTTON
  animateButton(button, tournamentView)
  // ANIMATE METRICS
  animateMetrics(metrics, tournamentView)
}

export default animateTournamentItem

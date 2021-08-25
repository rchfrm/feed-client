export default {
  unawareAudienceDescription: (value) => `The total number that have engaged with your posts has grown **${value}%**.`,
  onPlatformAudienceDescription: (adsValue, organicValue) => `On average **${adsValue}%** saw each post via Feed's ads, compared with **${organicValue}%** organically.`,
  popularPostDescription: (key) => {
    if (key === 'reach') {
      return 'people reached'
    }
    return 'new people engaged'
  },
}

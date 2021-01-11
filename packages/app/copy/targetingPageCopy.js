/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

import { capitalise } from '@/helpers/utils'

const getListOfSources = (isMusician, hasSpotify) => {
  if (!hasSpotify || !isMusician) return 'Facebook and Instagram followers'
  return 'Facebook and Instagram followers and Spotify listeners'
}

export default {

  noDefaultLinkCopy: `Before you can start running any ads, you need to choose a link for the ads to use.
  
**Please set a default link on the [Posts page](${ROUTES.POSTS}).**`,

  pausedWarning: `Spending is currently paused and no ads are running. You can still edit your settings.`,

  saveSettingsConfirmation: `**This will affect how your ads are run. Any changes may take up to 15 minutes to update.**
  
Are you sure you want to continue?`,

  saveWhenPausedCopy: `**Spending is currently paused**
  
  Would you like to resume spending with these settings? Or just save these settings and keep the spending paused?`,

  togglePauseWarning: (isPaused) => {
    if (isPaused) return `**This will resume spending on ads.** Are you sure you want to continue?`
    return `**This will pause all spending on ads.** All ads will stop and won't continue until you unpause.`
  },

  locationsDescription: (isMusician, hasSpotify) => `Your audience shown includes ${getListOfSources(isMusician, hasSpotify)}.`,

  locationsHelperText: `Currently we only show you countries and cities with more than 1% of your combined Instagram, Facebook & Spotify audience (if applicable). This is so we can recommend the best targeting locations based on your audience.

If you can't see a city but the country is shown, try targeting the country instead.
  
We are working on adding custom locations, but it would be really helpful if you could email us to let us know what you'd like to see here: [team@tryfeed.co](mailto:team@tryfeed.co)`,

  successMessage: (settingsSavedInitial) => {
    if (settingsSavedInitial) {
      return `Thanks! We'll be in touch shortly confirming you're all set, and your ads will start running shortly after that`
    }
    return `Your settings have been saved. Any changes may take up to 15 minutes to update.`
  },

  noBudgetIntro: `## Welcome to Feed!
  
### Let's get started by setting up your targeting preferences.`,

  // BUTTON TEXT
  saveSettingsButton: (isFirstTimeUser) => {
    if (isFirstTimeUser) return `Start Running Ads`
    return `Save Targeting Settings`
  },

  saveSettingsButtonMobile: (isFirstTimeUser) => {
    if (isFirstTimeUser) return `Start Running Ads`
    return `Save Settings and Budget`
  },

  // PLATFORMS WARNING
  getPlatformWarningCopy: (initialPlatform, chosenPlatform) => {
    const chosenPlatformCapital = capitalise(chosenPlatform)
    const alternativePlatform = chosenPlatform === 'instagram' ? 'Facebook' : 'Instagram'
    if (initialPlatform === 'both' && chosenPlatform === initialPlatform) return ''
    // Initial !BOTH && And !Change
    if (initialPlatform !== 'both' && chosenPlatform === initialPlatform) return ''
    let message
    // Initial !BOTH && chosen both
    if (initialPlatform !== 'both' && chosenPlatform === 'both') {
      return `This will mean your ads run on Facebook and Instagram. They may go back into review, but once approved will be promoted across both platforms.`
    }
    // Initial !BOTH && And Change && ! chosen both
    if (initialPlatform !== 'both' && chosenPlatform !== initialPlatform && chosenPlatform !== 'both') {
      message = `This will mean your ads only run on ${chosenPlatform}. They may go back into review, but once approved will no longer be promoted on ${alternativePlatform}.`

      // CHOSEN FB
      if (chosenPlatform === 'facebook') {
        message = `${message}

Feed will no longer promote Stories and you may get better results by selecting both Facebook and Instagram.`

        // CHOSEN Insta
      } else {
        message = `${message}

You may get better ad results by selecting both Facebook and Instagram.`
      }

      message = `${message}

Feed can still use your ${alternativePlatform} posts to create ads on ${chosenPlatformCapital} if you opt them in.`

      return message
    }
    // Going from BOTH to something else
    if (initialPlatform === 'both' && chosenPlatform !== 'both') {
      message = `This will mean your ads only run on ${chosenPlatformCapital}. They may go back into review, but once approved will no longer be promoted on ${alternativePlatform}`
    }

    // CHOSEN FB
    if (chosenPlatform === 'facebook') {
      message = `${message}
      
Feed will no longer promote Stories and you may see reduced ad performance.`

    // CHOSEN Insta
    } else {
      message = `${message}
        
Running ads on Instagram only may reduce ad performance.`
    }

    message = `${message}

    Feed can still use your ${alternativePlatform} posts to create ads on ${chosenPlatformCapital} if you opt them in.`

    return message
  },

  // HELP TEXT
  helpText: `## Help with Targeting Controls

### Choosing geographies

If you're new to digital ads, or unsure of which countries to target, then your home country is a good place to start. Or your home city if you're a very local business!
  
One thing to watch out for: your ads might cost more if you are targeting a very narrow group of people - so it's important to think about the overall population of the locations you have selected. If you're targeting cities, make sure you've selected a few. On the other hand, this needs to be balanced with maximising conversions, so narrow targeting might be important for you!
  
Any questions, feel free to email us [help@tryfeed.co](mailto:help@tryfeed.co)

### Suggested budget
  
The suggested budget makes sure you're spending enough relative to the size of audience you'll be targeting.
  
It also means that Feed can reach new people (cold audiences) and retarget people who have engaged with you before, but not recently (warm audiences), to convert people over time into followers, fans and customers.`,

}

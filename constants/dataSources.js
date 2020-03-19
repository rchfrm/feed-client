// https://coolors.co/7a9fff-e85a84-ffc249-aeefa2-1b2f33
import tinycolor from 'tinycolor2'
import brandColours from './brandColours'

const dataSourceDetails = {

  apple: {
    colour: '#1B2F33',
    textColour: brandColours.white,
  },
  apple_music_streams_7d: {
    colour: '#1B2F33',
    textColour: brandColours.white,
  },

  bandcamp: {
    colour: '#477987',
    textColour: brandColours.white,
  },

  facebook: {
    colour: tinycolor(brandColours.colorFb).lighten('5').toString(),
    textColour: brandColours.white,
  },
  facebook_likes: {
    colour: tinycolor(brandColours.colorFb).lighten('8').toString(),
    textColour: brandColours.white,
  },
  facebook_page_fans_country: {
    colour: tinycolor(brandColours.colorFb).lighten('8').toString(),
    textColour: brandColours.white,
  },
  facebook_page_fans_city: {
    colour: tinycolor(brandColours.colorFb).lighten('8').toString(),
    textColour: brandColours.white,
  },
  facebook_page_fans_gender_age: {
    colour: tinycolor(brandColours.colorFb).lighten('8').toString(),
    textColour: brandColours.white,
  },
  facebook_engaged_1y: {
    colour: tinycolor(brandColours.colorFb).lighten('11').toString(),
    textColour: brandColours.white,
  },
  facebook_engaged_28d: {
    colour: tinycolor(brandColours.colorFb).lighten('11').toString(),
    textColour: brandColours.white,
  },
  facebook_engaged_7d: {
    colour: tinycolor(brandColours.colorFb).lighten('11').toString(),
    textColour: brandColours.white,
  },
  facebook_ad_spend: {
    colour: brandColours.colorFb,
    textColour: brandColours.white,
  },
  facebook_ad_spend_feed: {
    colour: brandColours.colorFb,
    textColour: brandColours.white,
  },

  instagram: {
    colour: brandColours.colorInsta,
    textColour: brandColours.white,
  },
  instagram_follower_count: {
    colour: brandColours.colorInsta,
    textColour: brandColours.white,
  },
  instagram_audience_country: {
    colour: tinycolor(brandColours.colorInsta).lighten('5').toString(),
    textColour: brandColours.white,
  },
  instagram_audience_city: {
    colour: tinycolor(brandColours.colorInsta).lighten('5').toString(),
    textColour: brandColours.white,
  },
  instagram_audience_gender_age: {
    colour: tinycolor(brandColours.colorInsta).lighten('5').toString(),
    textColour: brandColours.white,
  },
  instagram_reach: {
    colour: tinycolor(brandColours.colorInsta).lighten('8').toString(),
    textColour: brandColours.white,
  },
  instagram_reach_7d: {
    colour: tinycolor(brandColours.colorInsta).lighten('11').toString(),
    textColour: brandColours.white,
  },
  instagram_profile_views: {
    colour: tinycolor(brandColours.colorInsta).lighten('14').toString(),
    textColour: brandColours.white,
  },
  instagram_profile_views_7d: {
    colour: tinycolor(brandColours.colorInsta).lighten('17').toString(),
    textColour: brandColours.white,
  },
  instagram_engaged_1y: {
    colour: tinycolor(brandColours.colorInsta).lighten('20').toString(),
    textColour: brandColours.textColor,
  },
  instagram_engaged_28d: {
    colour: tinycolor(brandColours.colorInsta).lighten('20').toString(),
    textColour: brandColours.textColor,
  },
  instagram_engaged_7d: {
    colour: tinycolor(brandColours.colorInsta).lighten('20').toString(),
    textColour: brandColours.textColor,
  },

  soundcloud: {
    colour: brandColours.colorSoundcloud,
    textColour: brandColours.white,
  },
  soundcloud_follower_count: {
    colour: tinycolor(brandColours.colorSoundcloud).lighten('5').toString(),
    textColour: brandColours.white,
  },
  soundcloud_listeners_7d: {
    colour: tinycolor(brandColours.colorSoundcloud).lighten('5').toString(),
    textColour: brandColours.white,
  },

  spotify: {
    colour: brandColours.colorSpotify,
    textColour: brandColours.textColor,
  },
  spotify_follower_count: {
    colour: brandColours.colorSpotify,
    textColour: brandColours.textColor,
  },
  spotify_streams_7d: {
    colour: tinycolor(brandColours.colorSpotify).lighten('5').toString(),
    textColour: brandColours.textColor,
  },
  spotify_listeners_7d: {
    colour: tinycolor(brandColours.colorSpotify).lighten('8').toString(),
    textColour: brandColours.textColor,
  },

  spotify_listeners_30d: {
    colour: tinycolor(brandColours.colorSpotify).lighten('11').toString(),
    textColour: brandColours.textColor,
  },

  twitter: {
    colour: brandColours.colorTwitter,
    textColour: brandColours.textColor,
  },
  twitter_follower_count: {
    colour: brandColours.colorTwitter,
    textColour: brandColours.textColor,
  },

  website: {
    colour: brandColours.textColor,
    textColour: brandColours.white,
  },

  youtube: {
    colour: brandColours.colorYoutube,
    textColour: brandColours.white,
  },
  youtube_subscriber_count: {
    colour: brandColours.colorYoutube,
    textColour: brandColours.white,
  },
  youtube_views: {
    colour: tinycolor(brandColours.colorYoutube).lighten('5').toString(),
    textColour: brandColours.white,
  },
  youtube_views_7d: {
    colour: tinycolor(brandColours.colorYoutube).lighten('5').toString(),
    textColour: brandColours.white,
  },

}

export default dataSourceDetails

// https://coolors.co/7a9fff-e85a84-ffc249-aeefa2-1b2f33
import tinycolor from 'tinycolor2'
import brandColors from './brandColors'

const dataSourceDetails = {

  apple: {
    color: '#1B2F33',
    textColor: brandColors.white,
  },
  apple_music_streams_7d: {
    color: '#1B2F33',
    textColor: brandColors.white,
  },

  bandcamp: {
    color: '#477987',
    textColor: brandColors.white,
  },

  facebook: {
    color: tinycolor(brandColors.colorFb).lighten('5').toString(),
    textColor: brandColors.white,
  },
  facebook_likes: {
    color: tinycolor(brandColors.colorFb).lighten('8').toString(),
    textColor: brandColors.white,
  },
  facebook_page_fans_country: {
    color: tinycolor(brandColors.colorFb).lighten('8').toString(),
    textColor: brandColors.white,
  },
  facebook_page_fans_city: {
    color: tinycolor(brandColors.colorFb).lighten('8').toString(),
    textColor: brandColors.white,
  },
  facebook_page_fans_gender_age: {
    color: tinycolor(brandColors.colorFb).lighten('8').toString(),
    textColor: brandColors.white,
  },
  facebook_engaged_1y: {
    color: tinycolor(brandColors.colorFb).lighten('11').toString(),
    textColor: brandColors.white,
  },
  facebook_engaged_28d: {
    color: tinycolor(brandColors.colorFb).lighten('11').toString(),
    textColor: brandColors.white,
  },
  facebook_engaged_7d: {
    color: tinycolor(brandColors.colorFb).lighten('11').toString(),
    textColor: brandColors.white,
  },
  facebook_ad_spend: {
    color: brandColors.colorFb,
    textColor: brandColors.white,
  },
  facebook_ad_spend_feed: {
    color: brandColors.colorFb,
    textColor: brandColors.white,
  },

  instagram: {
    color: brandColors.colorInsta,
    textColor: brandColors.white,
  },
  instagram_follower_count: {
    color: brandColors.colorInsta,
    textColor: brandColors.white,
  },
  instagram_audience_country: {
    color: tinycolor(brandColors.colorInsta).lighten('5').toString(),
    textColor: brandColors.white,
  },
  instagram_audience_city: {
    color: tinycolor(brandColors.colorInsta).lighten('5').toString(),
    textColor: brandColors.white,
  },
  instagram_audience_gender_age: {
    color: tinycolor(brandColors.colorInsta).lighten('5').toString(),
    textColor: brandColors.white,
  },
  instagram_reach: {
    color: tinycolor(brandColors.colorInsta).lighten('8').toString(),
    textColor: brandColors.white,
  },
  instagram_reach_7d: {
    color: tinycolor(brandColors.colorInsta).lighten('11').toString(),
    textColor: brandColors.white,
  },
  instagram_profile_views: {
    color: tinycolor(brandColors.colorInsta).lighten('14').toString(),
    textColor: brandColors.white,
  },
  instagram_profile_views_7d: {
    color: tinycolor(brandColors.colorInsta).lighten('17').toString(),
    textColor: brandColors.white,
  },
  instagram_engaged_1y: {
    color: tinycolor(brandColors.colorInsta).lighten('20').toString(),
    textColor: brandColors.textColor,
  },
  instagram_engaged_28d: {
    color: tinycolor(brandColors.colorInsta).lighten('20').toString(),
    textColor: brandColors.textColor,
  },
  instagram_engaged_7d: {
    color: tinycolor(brandColors.colorInsta).lighten('20').toString(),
    textColor: brandColors.textColor,
  },

  soundcloud: {
    color: brandColors.colorSoundcloud,
    textColor: brandColors.white,
  },
  soundcloud_follower_count: {
    color: tinycolor(brandColors.colorSoundcloud).lighten('5').toString(),
    textColor: brandColors.white,
  },
  soundcloud_listeners_7d: {
    color: tinycolor(brandColors.colorSoundcloud).lighten('5').toString(),
    textColor: brandColors.white,
  },

  spotify: {
    color: brandColors.colorSpotify,
    textColor: brandColors.textColor,
  },
  spotify_follower_count: {
    color: brandColors.colorSpotify,
    textColor: brandColors.textColor,
  },
  spotify_streams_7d: {
    color: tinycolor(brandColors.colorSpotify).lighten('5').toString(),
    textColor: brandColors.textColor,
  },
  spotify_listeners_7d: {
    color: tinycolor(brandColors.colorSpotify).lighten('8').toString(),
    textColor: brandColors.textColor,
  },

  spotify_listeners_30d: {
    color: tinycolor(brandColors.colorSpotify).lighten('11').toString(),
    textColor: brandColors.textColor,
  },

  twitter: {
    color: brandColors.colorTwitter,
    textColor: brandColors.textColor,
  },
  twitter_follower_count: {
    color: brandColors.colorTwitter,
    textColor: brandColors.textColor,
  },

  website: {
    color: brandColors.textColor,
    textColor: brandColors.white,
  },

  youtube: {
    color: brandColors.colorYoutube,
    textColor: brandColors.white,
  },
  youtube_subscriber_count: {
    color: brandColors.colorYoutube,
    textColor: brandColors.white,
  },
  youtube_views: {
    color: tinycolor(brandColors.colorYoutube).lighten('5').toString(),
    textColor: brandColors.white,
  },
  youtube_views_7d: {
    color: tinycolor(brandColors.colorYoutube).lighten('5').toString(),
    textColor: brandColors.white,
  },

}

export default dataSourceDetails

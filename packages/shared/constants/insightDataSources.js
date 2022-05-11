export default {
  // APPLE
  // ---------
  apple_music_streams_7d: {
    name: 'apple_music_streams_7d',
    platform: 'apple',
    visible: false,
    breakdown: false,
    title: 'streams',
    subtitle: '',
    period: 'weekly',
  },

  // FACEBOOK
  // ---------
  facebook_ad_impressions_feed: {
    name: 'facebook_ad_impressions_feed',
    platform: 'facebook',
    visible: true,
    breakdown: false,
    title: 'daily impressions',
    subtitle: 'through Feed',
    period: '',
    dataType: 'daily',
  },

  facebook_ad_spend: {
    name: 'facebook_ad_spend',
    platform: 'facebook',
    visible: false,
    breakdown: false,
    title: 'daily spend',
    subtitle: '',
    period: '',
    dataType: 'daily',
    currency: true,
  },

  facebook_ad_spend_feed: {
    name: 'facebook_ad_spend_feed',
    platform: 'facebook',
    visible: true,
    breakdown: false,
    title: 'daily spend',
    subtitle: 'through Feed',
    period: '',
    dataType: 'daily',
    currency: true,
  },

  facebook_conversion_event_audience_180d: {
    name: 'facebook_conversion_event_audience_180d',
    platform: 'facebook',
    visible: true,
    breakdown: false,
    title: 'conversion events',
    subtitle: 'in the last 6 months',
    period: 'biannually',
    dataType: 'biannually',
  },

  facebook_website_visitors_180d: {
    name: 'facebook_website_visitors_180d',
    platform: 'facebook',
    visible: true,
    breakdown: false,
    title: 'website visitors',
    subtitle: 'in the last 6 months',
    period: 'biannually',
    dataType: 'biannually',
  },

  facebook_engaged_1y: {
    name: 'facebook_engaged_1y',
    platform: 'facebook',
    visible: true,
    breakdown: false,
    title: 'engagement',
    subtitle: '',
    period: 'yearly',
    dataType: 'cumulative',
  },

  facebook_engaged_28d: {
    name: 'facebook_engaged_28d',
    platform: 'facebook',
    visible: false,
    breakdown: true,
    breakdownOf: 'facebook_engaged_1y',
    title: 'engagement',
    subtitle: '',
    period: 'monthly',
    dataType: 'monthly',
  },

  facebook_engaged_7d: {
    name: 'facebook_engaged_7d',
    platform: 'facebook',
    visible: false,
    breakdown: true,
    breakdownOf: 'facebook_engaged_1y',
    title: 'engagement',
    subtitle: '',
    period: 'weekly',
    dataType: 'weekly',
  },

  facebook_likes: {
    name: 'facebook_likes',
    platform: 'facebook',
    visible: true,
    breakdown: false,
    title: 'likes',
    subtitle: 'total',
    period: '',
    dataType: 'cumulative',
  },

  facebook_page_fans_city: {
    name: 'facebook_page_fans_city',
    platform: 'facebook',
    visible: true,
    breakdown: true,
    breakdownOf: 'facebook_likes',
    title: 'likes',
    subtitle: '',
    period: '',
    breakdownType: 'city',
    dataType: 'cumulative',
  },

  facebook_page_fans_country: {
    name: 'facebook_page_fans_country',
    platform: 'facebook',
    visible: true,
    breakdown: true,
    breakdownOf: 'facebook_likes',
    title: 'likes',
    breakdownType: 'country',
    period: '',
    subtitle: '',
    dataType: 'cumulative',
  },

  facebook_page_fans_gender_age: {
    name: 'facebook_page_fans_gender_age',
    platform: 'facebook',
    visible: true,
    breakdown: true,
    breakdownOf: 'facebook_likes',
    title: 'likes',
    breakdownType: 'gender/age',
    period: '',
    subtitle: '',
    dataType: 'cumulative',
  },

  // INSTAGRAM
  // ---------
  instagram_audience_city: {
    name: 'instagram_audience_city',
    platform: 'instagram',
    visible: true,
    breakdown: true,
    breakdownOf: 'instagram_follower_count',
    title: 'followers',
    breakdownType: 'city',
    period: '',
    subtitle: '',
    dataType: 'cumulative',
  },

  instagram_audience_country: {
    name: 'instagram_audience_country',
    platform: 'instagram',
    visible: true,
    breakdown: true,
    breakdownOf: 'instagram_follower_count',
    title: 'followers',
    breakdownType: 'country',
    period: '',
    subtitle: '',
    dataType: 'cumulative',
  },

  instagram_audience_gender_age: {
    name: 'instagram_audience_gender_age',
    platform: 'instagram',
    visible: true,
    breakdown: true,
    breakdownOf: 'instagram_follower_count',
    title: 'followers',
    breakdownType: 'city',
    period: '',
    subtitle: '',
    dataType: 'cumulative',
  },

  instagram_engaged_1y: {
    name: 'instagram_engaged_1y',
    platform: 'instagram',
    visible: true,
    breakdown: false,
    title: 'engagement',
    subtitle: '',
    period: 'yearly',
    dataType: 'cumulative',
  },

  instagram_engaged_28d: {
    name: 'instagram_engaged_28d',
    platform: 'instagram',
    visible: false,
    breakdown: true,
    breakdownOf: 'instagram_engaged_1y',
    title: 'engagement',
    subtitle: '',
    period: 'monthly',
    dataType: 'monthly',
  },

  instagram_engaged_7d: {
    name: 'instagram_engaged_7d',
    platform: 'instagram',
    visible: false,
    breakdown: true,
    breakdownOf: 'instagram_engaged_1y',
    title: 'engagement',
    subtitle: '',
    period: 'weekly',
    dataType: 'weekly',
  },

  instagram_follower_count: {
    name: 'instagram_follower_count',
    platform: 'instagram',
    visible: true,
    breakdown: false,
    title: 'followers',
    subtitle: 'total',
    period: '',
    dataType: 'cumulative',
  },

  instagram_historical_follower_count: {
    name: 'instagram_historical_follower_count',
    platform: 'instagram',
    visible: false,
    breakdown: false,
    title: 'followers',
    subtitle: 'total',
    period: '',
    dataType: 'cumulative',
  },

  instagram_profile_views: {
    name: 'instagram_profile_views',
    platform: 'instagram',
    visible: true,
    breakdown: false,
    title: 'profile views',
    subtitle: '',
    period: 'daily',
    dataType: 'daily',
  },

  instagram_profile_views_7d: {
    name: 'instagram_profile_views_7d',
    platform: 'instagram',
    visible: false,
    breakdown: true,
    breakdownOf: 'instagram_profile_views',
    title: 'profile views',
    subtitle: '',
    period: 'weekly',
    dataType: 'weekly',
  },

  instagram_reach: {
    name: 'instagram_reach',
    platform: 'instagram',
    visible: true,
    breakdown: false,
    title: 'reach',
    subtitle: '',
    period: 'daily',
    dataType: 'daily',
  },

  instagram_reach_7d: {
    name: 'instagram_reach_7d',
    platform: 'instagram',
    visible: false,
    breakdown: true,
    breakdownOf: 'instagram_reach',
    title: 'reach',
    subtitle: '',
    period: 'weekly',
    dataType: 'weekly',
  },

  // SOUNDCLOUD
  // ----------
  soundcloud_follower_count: {
    name: 'soundcloud_follower_count',
    platform: 'soundcloud',
    visible: true,
    breakdown: false,
    title: 'followers',
    subtitle: 'total',
    period: '',
    dataType: 'cumulative',
  },

  soundcloud_listeners_7d: {
    name: 'soundcloud_listeners_7d',
    platform: 'soundcloud',
    visible: true,
    breakdown: false,
    title: 'listeners',
    subtitle: '',
    period: 'weekly',
    dataType: 'weekly',
  },

  // SPOTIFY
  // ---------
  spotify_follower_count: {
    name: 'spotify_follower_count',
    platform: 'spotify',
    visible: true,
    breakdown: false,
    title: 'followers',
    subtitle: 'total',
    period: '',
    dataType: 'cumulative',
  },

  spotify_listeners_7d: {
    name: 'spotify_listeners_7d',
    platform: 'spotify',
    visible: true,
    breakdown: true,
    breakdownOf: 'spotify_listeners_30d',
    title: 'listeners',
    subtitle: '',
    period: 'weekly',
    dataType: 'weekly',
  },

  spotify_listeners_30d: {
    name: 'spotify_listeners_30d',
    platform: 'spotify',
    visible: true,
    breakdown: false,
    title: 'listeners',
    subtitle: '',
    period: 'monthly',
    dataType: 'monthly',
  },

  spotify_listeners_city: {
    name: 'spotify_listeners_city',
    platform: 'spotify',
    visible: false,
    breakdown: true,
    title: 'listeners',
    subtitle: '',
    period: 'monthly',
    dataType: 'monthly',
  },

  spotify_streams_7d: {
    name: 'spotify_streams_7d',
    platform: 'spotify',
    visible: true,
    breakdown: false,
    title: 'streams',
    subtitle: '',
    period: 'weekly',
    dataType: 'weekly',
  },

  // TWITTER
  // ---------
  twitter_follower_count: {
    name: 'twitter_follower_count',
    platform: 'twitter',
    visible: true,
    breakdown: false,
    title: 'followers',
    subtitle: 'total',
    period: '',
    dataType: 'cumulative',
  },

  // YOUTUBE
  // ---------
  youtube_subscriber_count: {
    name: 'youtube_subscriber_count',
    platform: 'youtube',
    visible: true,
    breakdown: false,
    title: 'subscribers',
    subtitle: 'total',
    period: '',
    dataType: 'cumulative',
  },

  youtube_views: {
    name: 'youtube_views',
    platform: 'youtube',
    visible: true,
    breakdown: false,
    title: 'views',
    subtitle: 'total',
    period: '',
    dataType: 'cumulative',
  },

  youtube_views_7d: {
    name: 'youtube_views_7d',
    platform: 'youtube',
    visible: true,
    breakdown: true,
    breakdownOf: 'youtube_views',
    title: 'views',
    subtitle: '',
    period: 'weekly',
    dataType: 'weekly',
  },

}

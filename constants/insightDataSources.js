export default {
  // APPLE
  // ---------
  apple_music_streams_7d: {
    id: 'apple_music_streams_7d',
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
    id: 'facebook_ad_impressions_feed',
    platform: 'facebook',
    visible: true,
    breakdown: false,
    title: 'daily impressions',
    subtitle: 'through feed',
    period: '',
  },

  facebook_ad_spend: {
    id: 'facebook_ad_spend',
    platform: 'facebook',
    visible: false,
    breakdown: false,
    title: 'daily spend',
    subtitle: '',
    period: '',
  },

  facebook_ad_spend_feed: {
    id: 'facebook_ad_spend_feed',
    platform: 'facebook',
    visible: true,
    breakdown: false,
    title: 'daily spend',
    subtitle: 'through feed',
    period: '',
  },

  facebook_engaged_1y: {
    id: 'facebook_engaged_1y',
    platform: 'facebook',
    visible: true,
    breakdown: false,
    title: 'engagement',
    subtitle: '',
    period: 'yearly',
  },

  facebook_engaged_28d: {
    id: 'facebook_engaged_28d',
    platform: 'facebook',
    visible: false,
    breakdown: true,
    breakdownOf: 'facebook_engaged_1y',
    title: 'engagement',
    subtitle: '',
    period: 'monthly',
  },

  facebook_engaged_7d: {
    id: 'facebook_engaged_7d',
    platform: 'facebook',
    visible: false,
    breakdown: false,
    title: 'engagement',
    subtitle: '',
    period: 'weekly',
  },

  facebook_likes: {
    id: 'facebook_likes',
    platform: 'facebook',
    visible: true,
    breakdown: false,
    title: 'likes',
    subtitle: 'total',
    period: '',
  },

  facebook_page_fans_city: {
    id: 'facebook_page_fans_city',
    platform: 'facebook',
    visible: true,
    breakdown: true,
    title: 'fans',
    subtitle: '',
    period: '',
    breakdownType: 'city',
  },

  facebook_page_fans_country: {
    id: 'facebook_page_fans_country',
    platform: 'facebook',
    visible: true,
    breakdown: true,
    title: 'fans',
    breakdownType: 'country',
    period: '',
    subtitle: '',
  },

  facebook_page_fans_gender_age: {
    id: 'facebook_page_fans_gender_age',
    platform: 'facebook',
    visible: true,
    breakdown: true,
    title: 'fans',
    breakdownType: 'gender/age',
    period: '',
    subtitle: '',
  },

  // INSTAGRAM
  // ---------
  instagram_audience_city: {
    id: 'instagram_audience_city',
    platform: 'instagram',
    visible: true,
    breakdown: true,
    title: 'audience',
    breakdownType: 'city',
    period: '',
    subtitle: '',
  },

  instagram_audience_country: {
    id: 'instagram_audience_country',
    platform: 'instagram',
    visible: true,
    breakdown: true,
    title: 'audience',
    breakdownType: 'country',
    period: '',
    subtitle: '',
  },

  instagram_audience_gender_age: {
    id: 'instagram_audience_gender_age',
    platform: 'instagram',
    visible: true,
    breakdown: true,
    title: 'audience',
    breakdownType: 'city',
    period: '',
    subtitle: '',
  },

  instagram_engaged_1y: {
    id: 'instagram_engaged_1y',
    platform: 'instagram',
    visible: true,
    breakdown: false,
    title: 'engagement',
    subtitle: '',
    period: 'yearly',
  },

  instagram_engaged_28d: {
    id: 'instagram_engaged_28d',
    platform: 'instagram',
    visible: false,
    breakdown: false,
    title: 'engagement',
    subtitle: '',
    period: 'monthly',
  },

  instagram_engaged_7d: {
    id: 'instagram_engaged_7d',
    platform: 'instagram',
    visible: false,
    breakdown: false,
    title: 'engagement',
    subtitle: '',
    period: 'weekly',
  },

  instagram_follower_count: {
    id: 'instagram_follower_count',
    platform: 'instagram',
    visible: true,
    breakdown: false,
    title: 'followers',
    subtitle: 'total',
    period: '',
  },

  instagram_profile_views: {
    id: 'instagram_profile_views',
    platform: 'instagram',
    visible: true,
    breakdown: false,
    title: 'profile views',
    subtitle: 'total',
    period: '',
  },

  instagram_profile_views_7d: {
    id: 'instagram_profile_views_7d',
    platform: 'instagram',
    visible: false,
    breakdown: true,
    breakdownOf: 'instagram_profile_views',
    title: 'profile views',
    subtitle: '',
    period: 'weekly',
  },

  instagram_reach: {
    id: 'instagram_reach',
    platform: 'instagram',
    visible: true,
    breakdown: false,
    title: 'reach',
    subtitle: '',
    period: 'daily',
  },

  instagram_reach_7d: {
    id: 'instagram_reach_7d',
    platform: 'instagram',
    visible: false,
    breakdown: true,
    breakdownOf: 'instagram_reach',
    title: 'reach',
    subtitle: '',
    period: 'weekly',
  },

  // SOUNDCLOUD
  // ----------
  soundcloud_follower_count: {
    id: 'soundcloud_follower_count',
    platform: 'soundcloud',
    visible: true,
    breakdown: false,
    title: 'followers',
    subtitle: 'total',
    period: '',
  },

  soundcloud_listeners_7d: {
    id: 'soundcloud_listeners_7d',
    platform: 'soundcloud',
    visible: true,
    breakdown: false,
    title: 'listeners',
    subtitle: 'rolling weekly total',
    period: '',
  },

  // SPOTIFY
  // ---------
  spotify_follower_count: {
    id: 'spotify_follower_count',
    platform: 'spotify',
    visible: true,
    breakdown: false,
    title: 'followers',
    subtitle: 'total',
    period: '',
  },

  spotify_listeners_7d: {
    id: 'spotify_listeners_7d',
    platform: 'spotify',
    visible: true,
    breakdown: true,
    breakdownOf: 'spotify_listeners_30d',
    title: 'listeners',
    subtitle: '',
    period: 'weekly',
  },

  spotify_listeners_30d: {
    id: 'spotify_listeners_30d',
    platform: 'spotify',
    visible: true,
    breakdown: false,
    title: 'listeners',
    subtitle: '',
    period: 'monthly',
  },

  spotify_streams_7d: {
    id: 'spotify_streams_7d',
    platform: 'spotify',
    visible: true,
    breakdown: false,
    title: 'streams',
    subtitle: '',
    period: 'weekly',
  },

  // TWITTER
  // ---------
  twitter_follower_count: {
    id: 'twitter_follower_count',
    platform: 'twitter',
    visible: true,
    breakdown: false,
    title: 'followers',
    subtitle: 'total',
    period: '',
  },

  // YOUTUBE
  // ---------
  youtube_subscriber_count: {
    id: 'youtube_subscriber_count',
    platform: 'youtube',
    visible: true,
    breakdown: false,
    title: 'subscribers',
    subtitle: 'total',
    period: '',
  },

  youtube_views: {
    id: 'youtube_views',
    platform: 'youtube',
    visible: true,
    breakdown: false,
    title: 'views',
    subtitle: 'total',
    period: '',
  },

  youtube_views_7d: {
    id: 'youtube_views_7d',
    platform: 'youtube',
    visible: true,
    breakdown: true,
    breakdownOf: 'youtube_views',
    title: 'views',
    subtitle: '',
    period: 'weekly',
  },

}

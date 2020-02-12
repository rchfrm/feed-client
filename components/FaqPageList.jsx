import React from 'react'
import Feed from './elements/Feed'

const FaqPageList = [
  {
    question: 'What do I need to use Feed?',
    answer: (
      <div>
        <p>
          To use
          <Feed />
          , you'll need to be an admin of a Facebook (business) Page as a minimum. If you are using Instagram, you'll need a
          <a href="https://help.instagram.com/502981923235522" target="_blank" rel="noopener noreferrer">business profile</a>
          {' '}
          and make sure it's
          <a href="https://help.instagram.com/399237934150902" target="_blank" rel="noopener noreferrer">linked to your Facebook Page</a>
          .
        </p>
        <p>You also will need to have added your payment details in Facebook Ads Manager (see below).</p>
      </div>
    ),
  },
  {
    question: "My Instagram data and/or posts aren't appearing?",
    answer: (
      <div>
        <p>
          It's likely that your Facebook Page and Instagram business profile are not quite fully linked. Luckily it’s a quick fix!
          <a href="https://www.facebook.com/business/help/898752960195806" target="_blank" rel="noopener noreferrer">Adding your Instagram account to your Facebook Page</a>
          {' '}
          only takes a couple of minutes.
        </p>
        <p>We’re working on something that will then let you refresh your account within Feed, but for now just email us at services@archform.ltd once this is done and we’ll sort everything our end.</p>
      </div>
    ),
  },
  {
    question: 'What if I haven’t added my card details to Facebook before?',
    answer: (
      <div>
        <p>
          If you haven’t run ads on Facebook or Instagram before, to use the beta version of
          <Feed />
          {' '}
          you’ll have to put your card details into Facebook separately.
        </p>
        <p>
          It only takes a couple of minutes to do this: just add your payment method in
          <a href="https://www.facebook.com/ads/manager/account_settings/account_billing" target="_blank" rel="noopener noreferrer">the billing section of Facebook’s Ads Manager.</a>
        </p>
      </div>
    ),
  },
  {
    question: 'How can I see data over time for my social and streaming accounts?',
    answer: (
      <div>
        <p>
          Make sure you've added your accounts from the 'accounts' page. You'll start seeing data the day after you do this. Once you've been using
          <Feed />
          {' '}
          for long enough, we'll show you your follower and engagement data over time.
        </p>
        <p>To see the full history of data we have for you on any one platform (e.g. Instagram), just deselect the other platforms from the home page view.</p>
      </div>
    ),
  },
  {
    question: 'I want to change the default link shown in my ads',
    answer: (
      <div>
        <p>You can do this from the 'account' page - just select the icon to the left of the page you want to send people to by default. If you then want to change the link from the default link on specific posts, just set it on the 'your posts' page.</p>
      </div>
    ),
  },
  {
    question: 'What budget should I set?',
    answer: (
      <div>
        <p>With digital ads, a higher budget will let you reach more people and can build your audience faster. But even a small ad budget can have a big impact.</p>
        <p>
          We recommend spending £3/day, which lets
          <Feed />
          {' '}
          find new fans and also remind people who have engaged with you in the past.
        </p>
        <p>It's easy to change your budget from the 'your posts' page. If you want to turn off digital ads for a period, just set the budget to £0. To start running ads again, just enter a budget of at least £1.</p>
      </div>
    ),
  },
  {
    question: 'When will I start seeing results from my ads?',
    answer: (
      <div>
        <p>
          When you've set up your account and entered your budget,
          <Feed />
          {' '}
          will set up and submit your ads for approval. Your ads should start running within 12 hours, at which point you can see how they are performing on the 'results' page.
        </p>
      </div>
    ),
  },
  {
    question: 'I got an email from Facebook saying my ad was disapproved.',
    answer: (
      <div>
        <p>This could be for a number of reasons, but isn't anything to worry about. It could be because there's too much text in the image, or there is profanity in the post text.</p>
        <p>
          <Feed />
          {' '}
          won't promote a post that isn't approved, and will simply skip to the next one.
        </p>
      </div>
    ),
  },
  {
    question: "Why are some of my recent posts not showing on the 'your posts' page?",
    answer: (
      <div>
        <p>The 'your posts' page shows posts that are in the queue to be made into ads. As soon as your posts are made into ads, they will disappear from this screen and you will be able to see their performance on the 'results' page.</p>
      </div>
    ),
  },
  {
    question: 'How long will it take to build my audience?',
    answer: (
      <div>
        <p>
          We built
          <Feed />
          {' '}
          to help artists build an audience of real people, not a bunch of fake followers. These are the people who will stream and download your music and buy gig tickets, merch, CDs and vinyls.
        </p>
        <p>We believe a steady and patient approach pays off in the long-run. Try smoothing your spend out over a longer period, rather than blowing your entire marketing budget in a few days around a release or a gig. You can still increase your spend around key events, just make sure you keep something back for the 'in between' periods.</p>
        <p>
          It's early days, but some of the first artists using
          <Feed />
          {' '}
          are on track to double their audience across platforms in a matter of months.
        </p>
      </div>
    ),
  },
  {
    question: "What else can I do to maximise Feed's impact?",
    answer: (
      <div>
        <p>
          <Feed />
          {' '}
          works best when you are regularly posting on social media, releasing music and playing live. In other words, just keep doing what you're doing!
        </p>
        <p>You don't have to be posting every day, just whatever 'regularly' means for you.</p>
        <p>
          <Feed />
          {' '}
          always work best alongside artists who are consistently engaging with their fans and staying active in the various parts of their music career.
        </p>
      </div>
    ),
  },
]

export default FaqPageList

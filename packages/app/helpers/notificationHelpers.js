export const dummyNotifications = [
  {
    id: 1,
    title: 'No shoes',
    description: 'You can\'t leave the house without shoes',
    action: null,
    read: false,
  },
  {
    id: 2,
    title: 'Click required',
    description: 'Please click the button when you get a chance.',
    action: 'click',
    read: false,
  },
  {
    id: 2,
    title: 'Old news baby',
    description: 'Yes, Helen, you might be my daughter-in-law. God shield you mean it not! daughter and mother So strive upon your pulse. What! pale again? My fear hath catch\'d your fondness.',
    action: 'click',
    read: true,
  },
]


// FETCH NOTIFICATIONS
export const fetchNotifications = (artistId) => {
  return new Promise((resolve) => {
    console.log('Fetch notifications for artist', artistId)
    resolve({ res: dummyNotifications, error: null })
  })
}

/* eslint-disable quotes */

export default {
  controlsOptions: [
    {
      key: 'targeting',
      title: 'Targeting',
      description: 'Control who sees your ads.',
      icon: 'crosshair',
    },
    {
      key: 'linkBank',
      title: 'Links',
      description: 'Add and edit the links that are used in your ads.',
      icon: 'link',
    },
    {
      key: 'integrations',
      title: 'Integrations',
      description: 'Connect Feed to other platforms.',
      icon: 'jigsaw',
    },
    {
      key: 'adSettings',
      title: 'Ad Defaults',
      description: 'Control the global settings of your ads.',
      icon: 'megaphone',
    },
    {
      key: 'conversionsSettings',
      title: 'Conversion Defaults',
      description: 'Settings specific to conversion campaigns.',
      icon: 'currency',
      hidden: false,
    },
  ],
}

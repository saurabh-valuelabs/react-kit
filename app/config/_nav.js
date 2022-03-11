const nav = [
  {
    name: 'Home',
    url: '/',
    icon: 'cui-dashboard icons',
    badge: {
      variant: 'info',
      text: '',
    },
  },
  {
    name: 'Users',
    icon: 'fas fa-users-cog',
    children: [
      {
        name: 'Existing List',
        url: '/user',
        icon: 'fa fa-list',
      },
      {
        name: 'Create New',
        url: `/user/create`,
        icon: 'fa fa-plus',
      },
    ],
  },
  {
    name: 'My Profile',
    url: '/my-profile',
    icon: 'fa fa-cogs',
  },
];

export default { items: nav };

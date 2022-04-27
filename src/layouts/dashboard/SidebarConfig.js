import React from 'react';
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
// import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import globe2fill from '@iconify/icons-eva/globe-2-fill';
// import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import infoFill from '@iconify/icons-eva/info-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill),
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon(peopleFill),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon(shoppingBagFill),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill),
  // },
  {
    title: 'Map page',
    path: '/dashboard/map',
    icon: getIcon(globe2fill),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill),
  // },
  // {
  //   title: 'Gas Stations',
  //   path: '/dashboard/gasstations',
  //   icon: getIcon(personAddFill),
  // },
  {
    title: 'About us',
    path: '/dashboard/about',
    icon: getIcon(infoFill),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill),
  // },
];

export default sidebarConfig;

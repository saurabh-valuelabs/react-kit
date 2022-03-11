import Dashboard from '../containers/Dashboard/Loadable';
import List from '../containers/List/Loadable';
import CreateEditDetail from '../containers/CreateEditDetail/Loadable';
import RichTextDocument from '../containers/RichTextDocument/Loadable';
import Demo from '../containers/Demo/Loadable';
import DummyPage from '../containers/DummyPage/Loadable';

const routes = [
  // Generic
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Dashboard,
  },
  // User - user
  {
    path: '/user',
    exact: true,
    name: 'User List',
    component: List,
    moduleCode: 'user',
    moduleType: 'list',
  },
  {
    path: '/user/create',
    exact: true,
    name: 'Create User',
    component: CreateEditDetail,
    moduleCode: 'user',
    moduleType: 'create',
  },
  {
    path: '/user/edit-:id',
    exact: true,
    name: 'Edit User',
    component: CreateEditDetail,
    moduleCode: 'user',
    moduleType: 'edit',
  },
  {
    path: '/user/detail-:id',
    exact: true,
    name: 'View User',
    component: CreateEditDetail,
    moduleCode: 'user',
    moduleType: 'detail',
  },
  // My Profile - myProfile
  {
    path: '/my-profile/',
    exact: true,
    name: 'My Profile',
    component: CreateEditDetail,
    moduleCode: 'myProfile',
    moduleType: 'edit',
  },
  {
    path: '/demo/',
    exact: true,
    name: 'My Profile',
    component: Demo,
    // moduleCode: 'myProfile',
    // moduleType: 'edit',
  },
  {
    path: '/dummy',
    exact: false,
    name: 'Dummy',
    component: DummyPage,
    moduleCode: 'myProfile',
    moduleType: 'edit',
  },
  // Page Not Found
  {
    path: '/',
    name: 'Page Not Found',
    component: RichTextDocument,
    preLogin: true,
  },
];

export default routes;

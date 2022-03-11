function allowedRoute(item, userProfile) {
  let result;
  const roles = userProfile.role_detail;
  if (item.preLogin === true || item.moduleCode === 'allowed') {
    result = true;
  } else if (roles && roles[item.moduleCode]) {
    result = roles[item.moduleCode].read && roles[item.moduleCode][item.type];
  } else {
    result = false;
  }
  return result;
}

export function filteredRoute(route, userProfile) {
  const newRoute = route.filter(item => allowedRoute(item, userProfile));
  return newRoute;
}

function transforRoute(path, userProfile) {
  let result = path.replace(':cafeid', userProfile.cafeid);
  result = result.replace(':counterid', userProfile.counterid);
  return result;
}

function compareRoute(item, url, userProfile) {
  const roles = userProfile.role_detail;
  let result;
  if (item.moduleCode === 'counter' && roles.cafe.allowed) {
    result = false;
  } else if (item.moduleCode === 'menu' && roles.counter.allowed) {
    result = false;
  } else {
    result = transforRoute(item.path, userProfile) === url;
  }
  return result;
}

function allowedNav(routes, item, userProfile) {
  let matchingRow = [];
  if (routes && routes.length) {
    matchingRow = routes.filter(route =>
      compareRoute(route, item.url, userProfile),
    );
  }
  let result;
  if ((item.children && item.children.length) || matchingRow.length) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

export function filteredNav(route, nav, userProfile) {
  let tempNav = nav;
  for (let navLooper = 0; navLooper < tempNav.length; navLooper += 1) {
    if (tempNav[navLooper].children && tempNav[navLooper].children.length) {
      tempNav[navLooper].children = filteredNav(
        route,
        tempNav[navLooper].children,
        userProfile,
      );
    }
  }
  tempNav = tempNav.filter(item => allowedNav(route, item, userProfile));
  return tempNav;
}

export function hasAccess(moduleCode, type, userProfile) {
  const roles = userProfile.role_detail;
  return roles[moduleCode].read && roles[moduleCode][type];
}

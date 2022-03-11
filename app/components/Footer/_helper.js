/*
 *
 * Navigation helper
 *
 */

import React from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export function returnItem(item) {
  return item.childrenList.map(innerItem => (
    <NavItem key={`footer-link-${innerItem.name}`} className="col-auto">
      <NavLink
        tag={Link}
        to={innerItem.udi ? innerItem.udi : innerItem.url}
        className="px-0"
      >
        {innerItem.name}
      </NavLink>
    </NavItem>
  ));
}

export function createNav(item) {
  return item.map(innerItem => (
    <Nav key={`footer-title-${item.headingText}`} className="row">
      {returnItem(innerItem)}
    </Nav>
  ));
}

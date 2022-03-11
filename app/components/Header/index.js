/**
 *
 * Navigation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { AppSidebarToggler } from '@coreui/react';

function Header({ imgSrc, altText }) {
  return (
    <>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <a className="navbar-brand" href="#/">
        <img src={imgSrc} alt={altText} className="logo-img" />
      </a>
    </>
  );
}

Header.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default Header;

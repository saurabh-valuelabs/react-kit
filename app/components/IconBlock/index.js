/**
 *
 * IconBlock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';

function IconBlock({ id, path, icon, label }) {
  return (
    <>
      <Link className="btn btn-link py-0" to={path}>
        <i className={`fa fa-${icon} fa-lg`} id={`tooltip-${label}-${id}`} />
        <UncontrolledTooltip target={`tooltip-${label}-${id}`}>
          {label}
        </UncontrolledTooltip>
      </Link>
    </>
  );
}

IconBlock.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default IconBlock;

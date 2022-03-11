/**
 *
 * TestComp
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { defaultFunction } from './_helper';

import './index.scss';

function TestComp() {
  return (
    <>
      <button
        onClick={() => {
          defaultFunction();
        }}
        type="button"
      >
        <FormattedMessage {...messages.myButton} />
      </button>
    </>
  );
}

TestComp.propTypes = {};

export default memo(TestComp);

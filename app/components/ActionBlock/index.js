/**
 *
 * ActionBlock
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'reactstrap';
import IconBlock from '../IconBlock/Loadable';

function ActionBlock({ id, path }) {
  return (
    <>
      <Row>
        <Col xs="12">
          <IconBlock
            id={id}
            path={`${path}/detail-${id}`}
            icon="info-circle"
            label="Details"
          />
          <IconBlock
            id={id}
            path={`${path}/edit-${id}`}
            icon="pencil-square-o"
            label="Edit"
          />
          {/* <IconBlock
            id={id}
            path={`${path}/delete/${id}`}
            icon="trash-o"
            label="Delete"
          /> */}
        </Col>
      </Row>
    </>
  );
}

ActionBlock.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default memo(ActionBlock);

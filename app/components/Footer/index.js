/**
 *
 * Footer
 *
 */

import React from 'react';
// import PropTypes from "prop-types";

import { Container, Row, Col } from 'reactstrap';

// import { createNav } from './_helper';

function Footer() {
  return (
    <Container fluid>
      <Row>
        <Col />
        <Col xs="auto">
          <span className="ml-auto px-0 nav-link">
            Powered by <a href="https://www.yoursite.com"> ValueLabs React</a>{' '}
          </span>{' '}
        </Col>{' '}
      </Row>{' '}
    </Container>
  );
}

Footer.propTypes = {};

export default Footer;

/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
  Row,
} from 'reactstrap';

import FormElement from '../FormElement/Loadable';

export function Login({
  headerBlock,
  inputHandler,
  loginHandler,
  formFields,
  formsValue,
  formsValid,
  formsReadonly,
  fieldFetched,
}) {
  return (
    <>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Row>
                <Card className="col-12 col-lg-6 order-2 order-lg-1 my-2">
                  <CardBody className="d-flex align-items-center justify-content-center">
                    <Form className="login-form">
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {formFields.map(formField => (
                        <InputGroup
                          className="mb-3"
                          key={`InputGroup-${formField.id}`}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className={formField.inputIcon} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormElement
                            formField={formField}
                            inputHandler={inputHandler}
                            typeAheadOptions={{}}
                            formsValue={formsValue}
                            formsValid={formsValid}
                            formsReadonly={formsReadonly}
                            fieldFetched={fieldFetched}
                          />
                          <FormFeedback>
                            {formField.validationMessage}
                          </FormFeedback>
                        </InputGroup>
                      ))}
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={() => loginHandler()}
                          >
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="col-12 col-lg-6 order-1 order-lg-2 my-2">
                  <CardBody className="d-flex align-items-center justify-content-center">
                    <img
                      src={headerBlock.logoSquareSrc}
                      className="square-logo"
                      alt="logo"
                    />
                  </CardBody>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

Login.propTypes = {
  headerBlock: PropTypes.object.isRequired,
  inputHandler: PropTypes.func.isRequired,
  loginHandler: PropTypes.func.isRequired,
  formFields: PropTypes.array.isRequired,
  formsValue: PropTypes.object.isRequired,
  formsValid: PropTypes.object.isRequired,
  formsReadonly: PropTypes.object.isRequired,
  fieldFetched: PropTypes.bool.isRequired,
};

export default Login;

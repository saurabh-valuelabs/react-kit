/* eslint-disable indent */
/**
 *
 * FormComponent
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
} from 'reactstrap';

// import { Typeahead } from 'react-bootstrap-typeahead';

import FormElement from '../FormElement/Loadable';

// import { defaultFunction } from './_helper';
function FormComponent({
  formInfo,
  formFields,
  inputHandler,
  headerInputHandler,
  typeAheadOptions,
  formsValue,
  formsValid,
  formsReadonly,
  tableHeader,
  tableBody,
  fieldFetched,
}) {
  const [selected, setSelected] = useState([]);
  return (
    <Row>
      <Col xl={12}>
        <Card>
          <CardHeader>
            <Row>
              <Col xs="12" md="6" className="align-items-center d-flex">
                <i className={`px-3 ${formInfo.icon}`} />{' '}
                <strong>{formInfo.label}</strong>
              </Col>
              {formInfo.isHeaderInputRequired && (
                <>
                  <Col xs>
                    <FormElement
                      formField={formInfo}
                      fieldFetched={fieldFetched}
                      inputHandler={(fieldName, selectedItem, fieldType) => {
                        setSelected(selectedItem);
                        if (selectedItem && selectedItem[0]) {
                          headerInputHandler(
                            selectedItem[0],
                            true,
                            formInfo.fields,
                          );
                        } else {
                          headerInputHandler(
                            {},
                            false,
                            formInfo.fields,
                            fieldName,
                            fieldType,
                          );
                        }
                      }}
                      typeAheadOptions={typeAheadOptions}
                      formsValue={{ [formInfo.fieldName]: selected }}
                      formsValid={{ [formInfo.fieldName]: false }}
                      formsReadonly={{ [formInfo.fieldName]: false }}
                    />
                  </Col>
                </>
              )}
            </Row>
          </CardHeader>
          <CardBody>
            <Form className="row">
              {formFields
                .filter(formField => formField.formType === formInfo.formType)
                .map(formField => (
                  <Col
                    xs={formField.col.default}
                    md={formField.col.md}
                    key={`FormFiledGroup-${formField.id}`}
                    className={formField.fieldType === 'hidden' ? 'd-none' : ''}
                  >
                    <FormGroup row>
                      {formField.label && (
                        <Col
                          xs={formField.col.defaultLabel}
                          md={formField.col.mdLabel}
                        >
                          <Label
                            id={`label-if${formField.id}`}
                            htmlFor={formField.id}
                            className={
                              formField.validationRules.isRequired
                                ? 'mandatory'
                                : ''
                            }
                          >
                            {formField.label}
                          </Label>
                        </Col>
                      )}
                      <Col xs>
                        <InputGroup>
                          {formField.inputIcon && (
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className={formField.inputIcon} />
                              </InputGroupText>
                            </InputGroupAddon>
                          )}
                          <FormElement
                            formField={formField}
                            inputHandler={inputHandler}
                            typeAheadOptions={typeAheadOptions}
                            formsValue={formsValue}
                            formsValid={formsValid}
                            tableHeader={tableHeader}
                            tableBody={tableBody}
                            formsReadonly={formsReadonly}
                            fieldFetched={fieldFetched}
                          />
                          <FormFeedback>
                            {formField.validationMessageOptions &&
                              Object.keys(
                                formField.validationMessageOptions,
                              ).map(fieldKey =>
                                typeof formsValid[formField.fieldName] ===
                                  'object' &&
                                formsValid[formField.fieldName][fieldKey]
                                  ? `${
                                      formField.validationMessageOptions[
                                        fieldKey
                                      ]
                                    }${'\n\r'}
                                    `
                                  : '',
                              )}
                            {formField.validationMessage}
                          </FormFeedback>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                  </Col>
                ))}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

FormComponent.propTypes = {
  formInfo: PropTypes.object.isRequired,
  formFields: PropTypes.array.isRequired,
  inputHandler: PropTypes.func.isRequired,
  headerInputHandler: PropTypes.func,
  typeAheadOptions: PropTypes.object,
  formsValue: PropTypes.object.isRequired,
  formsValid: PropTypes.object.isRequired,
  formsReadonly: PropTypes.object.isRequired,
  tableHeader: PropTypes.array,
  tableBody: PropTypes.array,
  fieldFetched: PropTypes.bool.isRequired,
};

export default FormComponent;

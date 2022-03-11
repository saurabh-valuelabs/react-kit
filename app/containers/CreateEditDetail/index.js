/**
 *
 * CreateEditDetail
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Row, Col, Button } from 'reactstrap';

import FormComponent from 'components/FormComponent/Loadable';

import {
  getFormValues,
  resetFormValues,
  inputHandler,
  fileUpload,
  formSubmit,
} from '../App/actions';

import {
  selectAppFormsValue,
  selectAppFormsValid,
  selectAppFormsReadOnly,
  selectAppTypeAheadOptions,
  selectAppFieldFetched,
  selectAppUserProfile,
} from '../App/selectors';

import { pageSetupInfo } from '../../config/_pageCreateEditDetail';

export function CreateEditDetail({
  match,
  moduleCode,
  moduleType,
  dGetFormValues,
  dResetFormValues,
  dInputHandler,
  dFormSubmit,
  formsValue,
  formsValid,
  formsReadonly,
  typeAheadOptions,
  fieldFetched,
  userProfile,
}) {
  const {
    meta,
    fieldName: formName,
    submitApiUrl,
    getApiUrl,
    formConfig,
  } = pageSetupInfo[moduleCode].createEditDelete;
  const isView = moduleType === 'detail';
  const callBackFun = moduleType !== 'edit' ? resetFormValues : false;
  const buttonName =
    moduleType && moduleCode
      ? `${moduleType.toUpperCase()} ${moduleCode.toUpperCase()}`
      : '';
  const fieldsList = formConfig.formInfo.fields;
  useEffect(() => {
    if (match.params.id || moduleCode === 'myProfile') {
      const id = match.params.id ? match.params.id : userProfile.iUserId;
      dGetFormValues(getApiUrl, id, formName, isView, fieldsList);
    } else {
      dResetFormValues(formName, fieldsList);
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>{meta.metaTitle}</title>
        <meta name="description" content={meta.metaDescription} />
      </Helmet>
      <h1 className="pt-3">{meta.metaTitle}</h1>
      {formConfig.formInfo.map(
        item =>
          (item.formType !== 'password' ||
            moduleType === 'create' ||
            moduleCode === 'myProfile') && (
            <div key={item.id} className="my-3">
              <FormComponent
                formInfo={item}
                inputHandler={(fieldName, fieldValue, type) =>
                  dInputHandler(formName, fieldName, fieldValue, type)
                }
                typeAheadOptions={typeAheadOptions}
                formFields={formConfig.formFields}
                formsValue={formsValue[formName]}
                formsValid={formsValid[formName]}
                formsReadonly={formsReadonly[formName]}
                fieldFetched={fieldFetched}
              />
            </div>
          ),
      )}

      {!isView && (
        <Row className="mb-3">
          <Col xs />
          <Col xs="auto">
            <Button
              color="primary"
              onClick={() =>
                dFormSubmit(
                  formName,
                  submitApiUrl,
                  callBackFun,
                  formConfig.formFields,
                  fieldsList,
                )
              }
              className="px-4"
            >
              {buttonName}
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

CreateEditDetail.propTypes = {
  match: PropTypes.any.isRequired,
  moduleCode: PropTypes.string.isRequired,
  moduleType: PropTypes.string.isRequired,
  dInputHandler: PropTypes.func.isRequired,
  dGetFormValues: PropTypes.func.isRequired,
  dResetFormValues: PropTypes.func.isRequired,
  dFormSubmit: PropTypes.func.isRequired,
  formsValue: PropTypes.object.isRequired,
  formsValid: PropTypes.object.isRequired,
  formsReadonly: PropTypes.object.isRequired,
  typeAheadOptions: PropTypes.object.isRequired,
  fieldFetched: PropTypes.bool.isRequired,
  userProfile: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  formsValue: selectAppFormsValue(),
  formsValid: selectAppFormsValid(),
  formsReadonly: selectAppFormsReadOnly(),
  typeAheadOptions: selectAppTypeAheadOptions(),
  fieldFetched: selectAppFieldFetched(),
  userProfile: selectAppUserProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dGetFormValues: (apiUrl, id, formName, readOnly, fieldsList) =>
      dispatch(getFormValues(apiUrl, id, formName, readOnly, fieldsList)),

    dResetFormValues: (formName, fieldsList) =>
      dispatch(resetFormValues({}, formName, fieldsList)),

    dInputHandler: (formName, fieldName, fieldValue, type) => {
      if (type === 'fileUpload') {
        dispatch(fileUpload(formName, fieldName, fieldValue, type));
      } else {
        dispatch(inputHandler(formName, fieldName, fieldValue, type));
      }
    },
    dFormSubmit: (formName, apiUrl, callBackFun, formFields, fieldsList) =>
      dispatch(
        formSubmit(formName, apiUrl, callBackFun, formFields, true, fieldsList),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(CreateEditDetail);

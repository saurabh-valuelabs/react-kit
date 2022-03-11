/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { toast } from 'react-toastify';
import { initialState } from './initialState';

import {
  GENERIC_ERROR_HANDLER,
  INPUT_HANDLER,
  FILE_UPLOAD,
  FORM_SUBMIT,
  FORM_SUBMIT_SUCCESS,
  SUBMIT_VALIDATION_FAILED,
  GET_FORM_VALUES,
  UPDATE_FORM_VALUES,
  RESET_FORM_VALUES,
  GET_TYPE_AHEAD_OPTIONS,
  SET_TYPE_AHEAD_OPTIONS,
  GET_LOGIN_STATUS,
  LOGIN_HANDLER,
  LOGIN_SUCCESS,
  LOGOUT_HANDLER,
  LOGOUT,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    /**
     * Variables for use
     */

    // Routes based on Role
    let matchingRowIndexes = {};
    switch (action.type) {
      /**
       * Generic
       */
      case GENERIC_ERROR_HANDLER:
        draft.isLoading = false;
        toast.error(action.payload.error.message);
        break;

      /**
       * Form Related
       */
      case INPUT_HANDLER:
        draft.formsValue[action.payload.formName][action.payload.fieldName] =
          action.payload.fieldValue;
        draft.isLoading = false;
        break;
      case FORM_SUBMIT:
        draft.formsValid[action.payload.formName] =
          initialState.formsValid[action.payload.formName];
        draft.isLoading = true;
        break;
      case FORM_SUBMIT_SUCCESS:
        draft.isLoading = false;
        toast.success(action.payload.staffName);
        break;
      case SUBMIT_VALIDATION_FAILED:
        matchingRowIndexes = Object.keys(action.payload.validationResponse);
        matchingRowIndexes.map(
          // eslint-disable-next-line no-return-assign
          item =>
            (draft.formsValid[action.payload.formName][item] =
              action.payload.validationResponse[item]),
        );
        draft.isLoading = false;
        toast.warn(action.payload.error.message);
        break;

      case UPDATE_FORM_VALUES:
        matchingRowIndexes = action.payload.fieldsList
          ? action.payload.fieldsList
          : Object.keys(draft.formsValue[action.payload.formName]);
        matchingRowIndexes.map(
          // eslint-disable-next-line array-callback-return
          item => {
            const apiValue = action.payload.response[0][item];
            const initialValue =
              initialState.formsValue[action.payload.formName][item];
            switch (item) {
              case 'tPassword':
                draft.formsValue[action.payload.formName][item] = apiValue;
                draft.formsValue[action.payload.formName][
                  `${item}Repeat`
                ] = apiValue;
                break;
              case 'tPasswordRepeat':
                break;
              case 'tRelatedProvinceCode':
                if (apiValue) {
                  const newApiValue = [];
                  // eslint-disable-next-line array-callback-return
                  apiValue.split(',').map(innerItem => {
                    newApiValue.push(
                      draft.typeAheadOptions.provinces.filter(
                        provinceItem =>
                          provinceItem.cProvinceCode === innerItem,
                      )[0],
                    );
                  });
                  draft.formsValue[action.payload.formName][item] = newApiValue;
                } else {
                  draft.formsValue[action.payload.formName][
                    item
                  ] = initialValue;
                }
                break;
              case 'iRelatedIndustryId':
                if (apiValue && apiValue !== '0') {
                  const newApiValue = [];
                  newApiValue.push(
                    draft.typeAheadOptions.industries.filter(
                      iItem => iItem.iIndustryId === apiValue,
                    )[0],
                  );
                  draft.formsValue[action.payload.formName][item] = newApiValue;
                } else {
                  draft.formsValue[action.payload.formName][
                    item
                  ] = initialValue;
                }
                break;
              case 'iRelatedFranchiseId':
                if (apiValue && apiValue !== '0') {
                  const newApiValue = [];
                  newApiValue.push(
                    draft.typeAheadOptions.franchises.filter(
                      iItem => iItem.iFranchiseId === apiValue,
                    )[0],
                  );
                  draft.formsValue[action.payload.formName][item] = newApiValue;
                } else {
                  draft.formsValue[action.payload.formName][
                    item
                  ] = initialValue;
                }
                break;
              case 'cRelatedModuleCode':
                if (apiValue) {
                  const newApiValue = [];
                  newApiValue.push(
                    draft.typeAheadOptions.pages.filter(
                      iItem => iItem.cModuleCode === apiValue,
                    )[0],
                  );
                  draft.formsValue[action.payload.formName][item] = newApiValue;
                } else {
                  draft.formsValue[action.payload.formName][
                    item
                  ] = initialValue;
                }
                break;
              default:
                draft.formsValue[action.payload.formName][item] =
                  apiValue || initialValue;
                break;
            }

            draft.formsReadonly[action.payload.formName][item] = action.payload
              .readOnly
              ? action.payload.readOnly
              : initialState.formsReadonly[action.payload.formName][item];

            draft.formsValid[action.payload.formName][item] = false;
          },
        );
        draft.isLoading = false;
        draft.fieldFetched = true;
        break;
      case RESET_FORM_VALUES:
        matchingRowIndexes = action.payload.fieldsList
          ? action.payload.fieldsList
          : Object.keys(draft.formsValue[action.payload.formName]);
        // matchingRowIndexes = Object.keys(
        //   draft.formsValue[action.payload.formName],
        // );
        matchingRowIndexes.map(
          // eslint-disable-next-line array-callback-return
          item => {
            draft.formsValue[action.payload.formName][item] =
              initialState.formsValue[action.payload.formName][item];
            draft.formsReadonly[action.payload.formName][item] =
              initialState.formsReadonly[action.payload.formName][item];
            draft.formsValid[action.payload.formName][item] =
              initialState.formsValid[action.payload.formName][item];
          },
        );
        draft.fieldFetched = false;
        break;

      /**
       * Type Ahead Params
       */
      case SET_TYPE_AHEAD_OPTIONS:
        draft.isLoading = false;
        draft.typeAheadOptions[action.payload.key] = action.payload.response;
        break;

      /**
       * Login Related
       */
      case GET_LOGIN_STATUS:
      case LOGIN_HANDLER:
      case LOGOUT_HANDLER:
      case FILE_UPLOAD:
      case GET_TYPE_AHEAD_OPTIONS:
      case GET_FORM_VALUES:
        draft.isLoading = true;
        break;
      case LOGIN_SUCCESS:
        draft.isLoading = false;
        draft.isLogin = action.payload.isLogin;
        draft.userProfile = action.payload.userProfile;
        break;
      case LOGOUT:
        draft.isLoading = false;
        draft.isLogin = false;
        draft.userProfile = initialState.userProfile;
        break;
    }
  });

export default appReducer;

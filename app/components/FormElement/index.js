/* eslint-disable indent */

/**
 *
 * FormElement
 *
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Container, Row, Col, Input, Button, CustomInput } from 'reactstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import CustomTable from '../CustomTable/Loadable';
import './index.scss';

import { imagePath } from '../../config/_env';

function FormElement({
  formField,
  inputHandler,
  typeAheadOptions,
  formsValue,
  formsValid,
  formsReadonly,
  fieldFetched,
}) {
  const ref = useRef();
  let editorState;
  let setEditorState;
  if (formField.fieldType === 'richtext') {
    const html = formsValue[formField.fieldName]
      ? formsValue[formField.fieldName]
      : '';
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [editorState, setEditorState] = useState(() =>
      EditorState.createWithContent(contentState),
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const htmlInside = formsValue[formField.fieldName]
        ? formsValue[formField.fieldName]
        : '';
      const contentBlockInside = htmlToDraft(htmlInside);
      const contentStateInside = ContentState.createFromBlockArray(
        contentBlockInside.contentBlocks,
      );
      setEditorState(EditorState.createWithContent(contentStateInside));
    }, [fieldFetched]);
  }

  switch (formField.fieldType) {
    case 'typeAhead':
      return (
        <Container fluid className="px-0">
          <Row noGutters className="d-flex">
            <Col xs>
              <Typeahead
                id={formField.id}
                allowNew={formField.allowNew || false}
                newSelectionPrefix="Add a new item: "
                placeholder={formField.placeHolder}
                labelKey={
                  formField.firstLabelKey
                    ? option =>
                        `${option[formField.firstLabelKey]} - ${
                          option[formField.secondLabelKey]
                        }`
                    : formField.labelKey
                }
                onChange={selectedItem => {
                  inputHandler(
                    formField.fieldName,
                    selectedItem,
                    formField.fieldType,
                  );
                }}
                multiple={formField.multiple || false}
                autocomplete={formField.autoComplete || 'on'}
                options={typeAheadOptions[formField.options]}
                selected={formsValue[formField.fieldName]}
                isInvalid={
                  typeof formsValid[formField.fieldName] === 'object'
                    ? true
                    : formsValid[formField.fieldName]
                }
                readOnly={formsReadonly[formField.fieldName]}
                disabled={formsReadonly[formField.fieldName]}
                ref={ref}
              />
            </Col>
            {!formsReadonly[formField.fieldName] && (
              <Col xs="auto">
                <Button
                  className="btn-secondary"
                  onClick={() => {
                    ref.current.clear();
                    inputHandler(formField.fieldName, [], formField.fieldType);
                  }}
                >
                  Clear
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      );
    case 'fileUpload':
      return (
        <>
          <Input
            type="file"
            name={formField.fieldName}
            id={formField.id}
            onChange={e => {
              inputHandler(
                formField.fieldName,
                {
                  folder: formField.folderName,
                  file: Array.from(e.target.files)[0],
                },
                formField.fieldType,
              );
            }}
            disabled={formsReadonly[formField.fieldName]}
          />
          {/* <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText> */}

          {formsValue[formField.fieldName] && (
            <div className="preview-image-block my-3">
              <img
                src={`${imagePath}${formField.folderName}/${
                  formsValue[formField.fieldName]
                }`}
                alt={formsValue[formField.fieldName]}
              />
            </div>
          )}
        </>
      );
    case 'checkbox':
      return (
        // <CustomInput
        //       type="checkbox"
        //       key={`${formField.id}_${item.label}`}
        //       id={`${formField.id}_${item.label}`}
        //       checked={formsValue[formField.fieldName] === item.value}
        //       disabled={formsReadonly[formField.fieldName]}
        //       onChange={e => {
        //         inputHandler(formField.id, e.target.checked, formField.fieldType);
        //       }}
        //       value={item.value}
        //       label={item.label}
        //     />
        <CustomInput
          type="checkbox"
          id={formField.id}
          checked={formsValue[formField.fieldName]}
          disabled={formsReadonly[formField.fieldName]}
          onChange={e => {
            inputHandler(formField.id, e.target.checked, formField.fieldType);
          }}
          autoComplete={formField.autoComplete || 'on'}
        />
      );
    case 'table':
      return (
        <Col xs>
          <CustomTable
            tableHeaders={formField.tableHeader}
            tableBody={formsValue[formField.fieldName]}
            applyClass={formField.tableClass}
            onChange={e => {
              inputHandler(
                formField.fieldName,
                e.target.checked,
                formField.fieldType,
              );
            }}
          />
        </Col>
      );
    case 'select':
      return (
        <Input
          type="select"
          name={formField.name}
          id={formField.id}
          disabled={formsReadonly[formField.fieldName]}
          onChange={e => {
            inputHandler(
              formField.fieldName,
              e.target.value,
              formField.fieldType,
            );
          }}
          autoComplete={formField.autoComplete || 'on'}
          value={formsValue[formField.fieldName]}
        >
          {formField.options.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Input>
      );
    case 'radio':
      return (
        <Container>
          <Row>
            {formField.options.map(item => (
              <CustomInput
                type="radio"
                key={`${formField.id}_${item.label}`}
                id={`${formField.id}_${item.label}`}
                checked={formsValue[formField.fieldName] === item.value}
                disabled={formsReadonly[formField.fieldName]}
                onChange={e => {
                  inputHandler(
                    formField.id,
                    e.target.value,
                    formField.fieldType,
                  );
                }}
                value={item.value}
                label={item.label}
                className="col-6"
              />
            ))}
          </Row>
        </Container>
      );
    case 'richtext':
      return (
        <div>
          <Editor
            name={formField.name}
            id={formField.id}
            disabled={formsReadonly[formField.fieldName]}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={selectedItem => {
              setEditorState(selectedItem);
              inputHandler(
                formField.fieldName,
                draftToHtml(convertToRaw(editorState.getCurrentContent())),
                formField.fieldType,
              );
            }}
          />
        </div>
      );
    default:
      return (
        <Input
          id={formField.id}
          type={formField.fieldType}
          placeholder={formField.placeHolder}
          value={formsValue[formField.fieldName]}
          invalid={
            typeof formsValid[formField.fieldName] === 'object'
              ? true
              : formsValid[formField.fieldName]
          }
          onChange={e => {
            inputHandler(
              formField.fieldName,
              e.target.value,
              formField.fieldType,
            );
          }}
          autoComplete={formField.autoComplete || 'on'}
          readOnly={formsReadonly[formField.fieldName]}
        />
      );
  }
}

FormElement.propTypes = {
  formField: PropTypes.object.isRequired,
  inputHandler: PropTypes.func.isRequired,
  typeAheadOptions: PropTypes.object,
  formsValue: PropTypes.object.isRequired,
  formsValid: PropTypes.object.isRequired,
  formsReadonly: PropTypes.object.isRequired,
  fieldFetched: PropTypes.bool.isRequired,
};
export default FormElement;

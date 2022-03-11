import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('should match the snapshot for loading', () => {
    const renderedComponent = renderer
      .create(<LoadingIndicator isLoading hasError={false} error="" />)
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should match the snapshot for error', () => {
    const renderedComponent = renderer
      .create(<LoadingIndicator hasError error="test" />)
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});

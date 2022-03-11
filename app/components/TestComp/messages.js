/*
 * TestComp Messages
 *
 * This contains all the text for the TestComp component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.TestComp';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TestComp component!',
  },
  myButton: {
    id: `${scope}.myButton`,
    defaultMessage: 'My Button',
  },
});

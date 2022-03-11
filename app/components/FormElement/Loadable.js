/**
 *
 * Asynchronously loads the component for FormElement
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

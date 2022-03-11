/**
 *
 * Asynchronously loads the component for FormComponent
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

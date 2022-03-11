/**
 *
 * Asynchronously loads the component for Messages
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

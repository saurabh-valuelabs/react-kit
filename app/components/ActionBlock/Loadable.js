/**
 *
 * Asynchronously loads the component for ActionBlock
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

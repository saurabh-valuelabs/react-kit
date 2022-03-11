/**
 *
 * Asynchronously loads the component for TestComp
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

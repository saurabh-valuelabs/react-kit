/**
 *
 * Asynchronously loads the component for RichTextDocument
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

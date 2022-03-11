/**
 *
 * MetaHeader
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

function MetaHeader({ meta, lang, dir }) {
  return (
    <>
      {lang && dir && <Helmet htmlAttributes={{ lang, dir }} />}
      <Helmet>
        {meta.logoSquareSrc && <link rel="icon" href={meta.logoSquareSrc} />}
        {meta.metaTitle && <title>{meta.metaTitle}</title>}
        {meta.metaDescription && (
          <meta name="description" content={`${meta.metaDescription}`} />
        )}
        {meta.metaKeywords && (
          <meta name="Keywords" content={`${meta.metaKeywords}`} />
        )}
        {meta.geoRegion && (
          <meta name="geo.region" content={`${meta.geoRegion}`} />
        )}
        {meta.geoPlacename && (
          <meta name="geo.placename" content={`${meta.geoPlacename}`} />
        )}
        {meta.geoPosition && (
          <meta name="geo.position" content={`${meta.geoPosition}`} />
        )}
        {meta.ICBM && <meta name="ICBM" content={`${meta.ICBM}`} />}
        {meta.ogSiteName && (
          <meta property="og:site_name" content={`${meta.ogSiteName}`} />
        )}
        {meta.ogUrl && <meta property="og:url" content={`${meta.ogUrl}`} />}
        {meta.ogTitle && (
          <meta property="og:title" content={`${meta.ogTitle}`} />
        )}
        <meta
          property="og:url"
          // eslint-disable-next-line no-restricted-globals
          content={`${meta.ogUrl ? meta.ogUrl : location.href}`}
        />
        {meta.ogDescription && (
          <meta property="og:description" content={`${meta.ogDescription}`} />
        )}

        {meta.ogType && <meta property="og:type" content={`${meta.ogType}`} />}
        {meta.ogImage && (
          <meta property="og:image" content={`${meta.ogImage}`} />
        )}
      </Helmet>
    </>
  );
}

MetaHeader.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.object.isRequired,
  dir: PropTypes.string,
};

export default MetaHeader;

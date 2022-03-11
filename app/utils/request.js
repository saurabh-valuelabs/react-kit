import axios from 'axios';

import { myEndPoint } from '../config/_env';

/**
 * Returns validated and parsed API Response
 *
 * @param {Object} response  API Response of Axios Call
 *
 * @returns Either formatted JSON data or Error
 */
function parseResponse(response) {
  let text = '';
  if (response) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    text = response.data || 'Server Error!';
  } else {
    text = 'Server Error';
  }

  const error = new Error(text.message);
  error.response = response;
  throw error;
}

/**
 * Returns Auth header for API call
 *
 * @param {String} endPoint
 * @param {String} type
 *
 * @returns Complete Header
 */
const getHeader = (endPoint, type) => {
  let header;
  switch (endPoint) {
    case 'MyEndPoint':
      header = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      };
      if (type === 'upload') {
        header = {
          'content-type': 'multipart/form-data',
        };
      }
      break;
    default:
      header = {
        'Content-Type': 'application/json',
      };
      break;
  }
  return header;
};

/**
 * Returns Complete URL for API call
 *
 * @param {String} endPoint
 *
 * @returns Complete URL
 */
const getFullUrl = (endPoint, tempType, url) => {
  let fullUrl;
  let type = tempType;
  switch (endPoint) {
    default:
      fullUrl = url;
      break;
    case 'MyEndPoint':
      if (type === 'upload') {
        type = 'post';
      }
      fullUrl = `${myEndPoint}/${url}`;
      break;
  }
  return fullUrl;
};

/**
 * Returns Auth header for API call
 *
 * @param {String} endPoint
 *
 * @returns Complete Header
 */
/**
 * Call RESTful API call to all four endpoint
 *
 * @param {String} url,
 * @param {String} type,    Possible values are 'get, post, update, delete'
 * @param {String} endPoint, Possible values are 'MyEndPoint'
 * @param {Object} [body] Params passed for API call, not required in get call
 *
 * @returns Parsed API response or Error
 */
export const getApiCall = async (url, tempType, endPoint, body) => {
  try {
    let type = tempType;
    const fullUrl = getFullUrl(endPoint, type, url);
    const header = getHeader(endPoint, type);
    const data = new FormData();
    if (type === 'upload') {
      data.append('photo', body.file);
      data.append('folderName', body.folder);
    } else {
      data.append('data', JSON.stringify(body));
    }
    if (type === 'upload' || type === 'select') {
      type = 'post';
    }
    const response = await axios({
      method: type,
      url: fullUrl,
      data,
      headers: header,
    });
    return parseResponse(response);
  } catch (err) {
    return parseResponse(err.response);
  }
};

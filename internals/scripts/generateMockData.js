/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

const jsf = require('json-schema-faker');
const fs = require('fs');
const mockDataSchema = require('./mockApi/index');

const json = JSON.stringify(jsf(mockDataSchema));

fs.writeFile("./api/db.json", json, (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  return err;
});

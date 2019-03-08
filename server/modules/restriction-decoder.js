// Dependencies
const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse/lib/sync');

// Constants
const ASSETS_DIR = `${__dirname}/../assets/`;
const COLUMN_HEADERS = ['days', 'times', 'route', 'other'];

function mapCodeData(codeData) {
  const restrictions = [];

  // Loop through segments of data (starting after code itself)
  for (let i = 1; i + 4 <= codeData.length; i += 4) {
    // Slice for current segment (representing current restriction)
    const segment = codeData.slice(i, i + 4);

    // Only include restriction if its items aren't blank
    if (!segment.every(item => item === '')) {
      // Reduce this segment into a restriction object
      const restrictionObj = segment.reduce((restrictionItem, field, i) => {
        restrictionItem[COLUMN_HEADERS[i]] = field;
        return restrictionItem;
      }, {});

      // Explicitly 'arrayify' days field for convinience
      restrictionObj.days = restrictionObj.days.split('');

      // Push this restriction object to restrictions array
      restrictions.push(restrictionObj);
    }
  }

  return restrictions;
}

function buildRestrictionCodeObj(code, outCodeData, rtnCodeData) {
  // Init restriction code object
  const codeObj = {
    code: '',
    outRestrictions: [],
    rtnRestrictions: [],
    isValid: false
  };

  // Set restriction code
  codeObj.code = code;

  // Add outward and return restrictions if each exists
  if (outCodeData.length) {
    codeObj.isValid = true;
    codeObj.outRestrictions = mapCodeData(outCodeData[0]);
  }
  if (rtnCodeData.length) {
    codeObj.isValid = true;
    codeObj.rtnRestrictions = mapCodeData(rtnCodeData[0]);
  }

  return codeObj;
}

// Main
module.exports = restrictionCode => {
  restrictionCode = restrictionCode.toUpperCase();
  const codeFilterFn = codeData => codeData[0] === restrictionCode;

  // Import restriction codes data
  const outCsv = fs.readFileSync(path.join(ASSETS_DIR, 'restriction-codes-out.csv'));
  const rtnCsv = fs.readFileSync(path.join(ASSETS_DIR, 'restriction-codes-rtn.csv'));

  // Parse CSVs
  const outCodes = csvParse(outCsv);
  const rtnCodes = csvParse(rtnCsv);

  // Filter for code and build into code object
  const outCodeData = outCodes.filter(codeFilterFn);
  const rtnCodeData = rtnCodes.filter(codeFilterFn);
  return buildRestrictionCodeObj(restrictionCode, outCodeData, rtnCodeData);
}

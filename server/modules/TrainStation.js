const crsCodes = require('../assets/crs-codes.json');
const stnLocations = require('../assets/crs-locations.json');
const stnAccess = require('../assets/crs-accessibility.json');
const Fare = require('./Fare');

class TrainStation {
  constructor(crs) {
    this.crs = crs;

    // Look up name of station
    this.name = Object.keys(crsCodes).find(stnName => crsCodes[stnName] === crs);

    // Check whether station actually exists
    this.isRealStation = Boolean(this.name) && Fare.isValidCrs(crs);

    if (this.isRealStation) {
      // If so, find its coords
      const coords = stnLocations[crs];
      this.lat = coords[0];
      this.lon = coords[1];

      // ...and look up its accessibility info
      this.staffHelp = false;
      this.wheelchairAccess = false;
      if (stnAccess[crs]) {
        const accessibility = stnAccess[crs];
        this.staffHelp = accessibility.staffHelp;
        this.wheelchairAccess = accessibility.wheelchairAccess;
      }
    }
  }
}

module.exports = TrainStation;

const crsCodes = require('../assets/crs-codes.json');
const stnLocations = require('../assets/crs-locations.json');
const Fare = require('./Fare');

class TrainStation {
  constructor(crs) {
    this.crs = crs;

    this.name = Object.keys(crsCodes).find(stnName => crsCodes[stnName] === crs);

    this.isRealStation = Boolean(this.name) && Fare.isValidCrs(crs);

    const coords = stnLocations[crs];
    this.lat = coords[0];
    this.lon = coords[1];
  }
}

module.exports = TrainStation;

const stnLocations = require('../assets/crs-locations.json');

class TrainStation {
  constructor(crs) {
    this.crs = crs;

    const coords = stnLocations[crs];
    this.lat = coords[0];
    this.lon = coords[1];
  }
}

module.exports = TrainStation;

// Dependencies
const fetch = require("node-fetch");

// Constants
const API_ENDPOINT = 'http://api.brfares.com/querysimple';

function fareIsRelevant(fare) {
  return fare.category.desc !== 'OTHER' || fare.ticket.type.desc !== 'SEASON';
}

class Fare {
  constructor(fare) {
    this.code = fare.ticket.code;

    const cat = fare.category.desc;
    if (cat === 'WALKUP') {
      this.category = fare.restriction_code === '  ' ? Fare.CATEGORY_ANYTIME : Fare.CATEGORY_OFFPEAK;
    } else if (cat === 'QUOTA') {
      this.category = Fare.CATEGORY_ADVANCE;
    }

    this.restrictionCode = fare.restriction_code;
    this.isSingle = (fare.ticket.type.desc === 'SINGLE');
    this.isStdClass = (fare.ticket.tclass.desc === 'STD');
    this.isAdult = Object.keys(fare.adult).length > 0;
    this.isChild = Object.keys(fare.child).length > 0;

    if (this.isAdult) {
      this.adultPrice = fare.adult.fare;
    }
    if (this.isChild) {
      this.childPrice = fare.child.fare;
    }
  }

  static fetchFaresForRoute(originCrs, destCrs, railcard) {
    originCrs = originCrs.toUpperCase();
    destCrs = destCrs.toUpperCase();
  
    // Construct query URL
    const railcardParam = railcard ? `&rlc=${railcard}` : '';
    const queryUrl = `${API_ENDPOINT}?orig=${originCrs}&dest=${destCrs}${railcardParam}`;
  
    // Make query
    return fetch(queryUrl)
      .then(data => data.json())
      .then(res => res.fares.filter(fare => fareIsRelevant(fare)).map(fare => new Fare(fare)));
  }
}

Fare.CATEGORY_ADVANCE = 0;
Fare.CATEGORY_OFFPEAK = 1;
Fare.CATEGORY_ANYTIME = 2;

module.exports = Fare;

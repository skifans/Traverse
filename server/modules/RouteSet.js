// Dependencies
const fetch = require('node-fetch');
const TrainStation = require('./TrainStation');
const routing = require('./routing');

const endpoint = 'http://fcc.transportapi.com/v3/uk/public/journey';

const addZero = n => parseInt(n) < 10 ? `0${n}` : `${n}`;

class RouteSet {
  constructor(origin, destination, datetime) {
    this.origin = new TrainStation(origin);
    this.destination = new TrainStation(destination);
    this.datetime = new Date(datetime);
    this.routes = [];
  }

  findRoutes() {
    const from = `lonlat:${this.origin.lon},${this.origin.lat}`;
    const to = `lonlat:${this.destination.lon},${this.destination.lat}`;
    const formattedDate = `${this.datetime.getFullYear()}-${addZero(this.datetime.getMonth() + 1)}-${addZero(this.datetime.getDate())}`;
    const formattedTime = `${addZero(this.datetime.getHours())}:${addZero(this.datetime.getMinutes())}`;

    const url = `${endpoint}/from/${from}/to/${to}/at/${formattedDate}/${formattedTime}.json`;
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.routes) {
          this.routes = res.routes.map(route => routing.Route(route))
        }
      });
  }
}

module.exports = RouteSet;

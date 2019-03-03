const crsLocations = require('../assets/crs-locations.json');

const toDatetime = (date, time) => new Date(...date.split('-'), ...time.split(':'));

const RoutePart = partData => ({
    origin: partData.from_point_name,
    destination: partData.to_point_name,
    duration: partData.duration,
    departureTime: partData.departure_time,
    arrivalTime: partData.arrival_time
});

const Route = (routeData, reqDatetime) => {
  let departureDatetime, arrivalDatetime;

  if (routeData.departure_date) {
    departureDatetime = toDatetime(routeData.departure_date, routeData.departure_time);
  } else {
    const timeParts = routeDate.departure_time.split(':');
    departureDatetime = new Date(reqDatetime).setHours(...timeParts);
  }
  if (routeData.arrival_time) {
    arrivalDatetime = toDatetime(routeData.arrival_date, routeData.arrival_time)
  } else {
    const depTime = routeData.departure_time.split(':').map(parseInt);
    const arrTime = routeData.arrival_time.split(':').map(parseInt);

    if (arrTime[0] < depTime[0]) {
      reqDatetime.setDate(reqDatetime.getDate() + 1);
    }
    
    arrivalDatetime = new Date(reqDatetime);
    arrivalDatetime.setHours(depTime[0], depTime[1], 0);
  }

  return {
    duration: routeData.duration,
    departureDatetime,
    arrivalDatetime,
    routeParts: routeData.route_parts
      .filter(part => part.mode === 'train')
      .map(part => RoutePart(part))
  }
};

const validateDates = (routeData, reqDatetime) => {
  
}

module.exports = { Route, RoutePart, validateDates };

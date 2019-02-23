const crsLocations = require('../assets/crs-locations.json');

const dateAndTimeToDatetime = (date, time) => new Date(...date.split('-'), ...time.split(':'));

const RoutePart = partData => ({
    origin: partData.from_point_name,
    destination: partData.to_point_name,
    duration: partData.duration,
    departureTime: partData.departure_time,
    arrivalTime: partData.arrival_time
});

const Route = routeData => ({
  duration: routeData.duration,
  departureDatetime: dateAndTimeToDatetime(routeData.departure_date, routeData.departure_time),
  arrivalDatetime: dateAndTimeToDatetime(routeData.arrival_date, routeData.arrival_time),
  routeParts: routeData.route_parts
    .filter(part => part.mode === 'train')
    .map(part => RoutePart(part))
});

module.exports = { Route, RoutePart };

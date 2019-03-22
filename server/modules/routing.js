const TrainStation = require('./TrainStation');
const crs = require('../assets/crs-codes.json');

const toDatetime = (date, time) => new Date(...date.split('-'), ...time.split(':'));
const addZero = n => parseInt(n) < 10 ? `0${n}` : `${n}`;

const RoutePart = partData => {
  const part = {
    origin: partData.from_point_name,
    destination: partData.to_point_name,
    duration: partData.duration,
    departureTime: partData.departure_time,
    arrivalTime: partData.arrival_time,
    type: partData.mode
  };

  if (crs[part.origin]) part.originStn = new TrainStation(crs[part.origin]);
  if (crs[part.destination]) part.destinationStn = new TrainStation(crs[part.destination]);

  return part;
};

const Route = (routeData, reqDatetime) => {
  let departureDatetime, arrivalDatetime;

  if (routeData.departure_date) {
    departureDatetime = toDatetime(routeData.departure_date, routeData.departure_time);
  } else {
    const timeParts = routeDate.departure_time.split(':');
    departureDatetime = new Date(reqDatetime).setHours(...timeParts);
  }
  if (routeData.arrival_time) {
    arrivalDatetime = toDatetime(routeData.arrival_date, routeData.arrival_time);
  } else {
    const depTime = routeData.departure_time.split(':').map(parseInt);
    const arrTime = routeData.arrival_time.split(':').map(parseInt);

    if (arrTime[0] < depTime[0]) {
      reqDatetime.setDate(reqDatetime.getDate() + 1);
    }
    
    arrivalDatetime = new Date(reqDatetime);
    arrivalDatetime.setHours(depTime[0], depTime[1], 0);
  }
  
  const dataPartsLen = routeData.route_parts.length;
  const routeParts = routeData.route_parts
    .filter((part, i) => {
      const durationMins = parseInt(part.duration.split(':')[1]);
      const isMiddle = i > 0 && i < dataPartsLen - 1;

      return part.mode === 'train' ||
        (part.mode === 'foot' && (isMiddle || durationMins >= 10));
    })
    .map(part => RoutePart(part));
  
  routeParts.forEach((part, i) => {
    if (routeParts[i + 1]) {
      const nextPart = routeParts[i + 1];
      
      const start = toDatetime('0-0-0', part.arrivalTime);
      const end = toDatetime('0-0-0', nextPart.departureTime);
      const waitTimeMins = (end - start) / 1000 / 60;
      const duration = `${addZero(Math.floor((waitTimeMins / 60) % 24))}:${addZero(Math.floor(waitTimeMins % 60))}:00`;

      routeParts[i].waitDuration = duration;
      routeParts[i].waitTime = waitTimeMins;
    }
  });

  return {
    duration: routeData.duration,
    departureDatetime,
    arrivalDatetime,
    routeParts
  }
};

module.exports = { Route, RoutePart };

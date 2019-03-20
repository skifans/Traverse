const toDatetime = (date, time) => new Date(...date.split('-'), ...time.split(':'));
const addZero = n => parseInt(n) < 10 ? `0${n}` : `${n}`;

const RoutePart = partData => ({
    origin: partData.from_point_name,
    destination: partData.to_point_name,
    duration: partData.duration,
    departureTime: partData.departure_time,
    arrivalTime: partData.arrival_time,
    type: partData.mode
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
  
  const routeParts = routeData.route_parts
    .filter(part => ['train', 'walk'].includes(part.mode))
    .map(part => RoutePart(part));
  
  routeParts.forEach((part, i) => {
    if (routeParts[i + 1]) {
      const nextPart = routeParts[i + 1];
      if (part.type === 'train' && nextPart.type === 'train') {
        const waitStart = toDatetime('0-0-0', part.arrivalTime);
        const waitEnd = toDatetime('0-0-0', nextPart.departureTime);
        const waitDiff = waitEnd - waitStart;

        const duration = `${addZero(Math.floor((waitDiff / 1000 / 60 / 60) % 24))}:${addZero(Math.floor((waitDiff / 1000 / 60) % 60))}:00`;

        routeParts.splice(i + 1, 0, RoutePart({
          from_point_name: part.destination,
          to_point_name: nextPart.origin,
          duration,
          departure_time: part.arrivalTime,
          arrival_time: nextPart.departureTime,
          mode: 'wait'
        }));
      }
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

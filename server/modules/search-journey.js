// Dependencies
const RouteSet = require('./RouteSet');
const Fare = require('./Fare');

module.exports = async formData => {
  const response = [];

  // Process each leg of the journey
  for (let i = 0; i < formData.legs.length; i++) {
    // Reformat input
    const leg = formData.legs[i];
    leg.datetime = new Date(leg.datetime);
    leg.adults = parseInt(leg.adults);

    // Construct set of routes for journey
    const routeSet = new RouteSet(leg.origin, leg.destination, leg.datetime);

    // Await async API responses
    const fareFetch = Fare.fetchFaresForRoute(leg.origin, leg.destination);
    const routeFetch = routeSet.findRoutes();
    const data = await Promise.all([fareFetch, routeFetch]);

    // Push responses to returned array
    const fareData = data[0];
    response.push({
      fares: fareData,
      routes: routeSet,
      services: []
    });

  }

  return response;
}

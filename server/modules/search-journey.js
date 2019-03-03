// Dependencies
const RouteSet = require('./RouteSet');
const Fare = require('./Fare');

const DEFAULT_OPTS = {
  'stepFree': false,
  'deptAssistance': false,
  'bikeStorageStn': false,
  'bikeStorageTrain': false
};

module.exports = async formData => {
  const response = [];

  formData.adults = formData.adults ? parseInt(formData.adults) : 1;
  formData.children = formData.children ? parseInt(formData.children) : 0;
  formData.options = formData.options ? formData.options : DEFAULT_OPTS;

  if (formData.legs && Array.isArray(formData.legs)) {

    // Process each leg of the journey
    for (let i = 0; i < formData.legs.length; i++) {
      const leg = formData.legs[i];
      response.push({
        fares: {},
        routes: {},
        services: [],
        error: false
      });

      // Only continue if input for this leg is valid
      if (Fare.isValidCrs(leg.origin, leg.destination) && leg.datetime) {

        // Reformat input
        const leg = formData.legs[i];
        leg.datetime = leg.datetime ? new Date(leg.datetime) : new Date();

        // Construct set of routes for journey
        const routeSet = new RouteSet(leg.origin, leg.destination, leg.datetime);

        // Await async API responses
        const routeFetch = routeSet.findRoutes();
        const fareFetch = Fare.fetchFaresForRoute(leg.origin, leg.destination);
        const data = await Promise.all([routeFetch, fareFetch]);

        // Push responses to returned array
        const fareData = data[1];
        response[i].fares = fareData;
        response[i].routes = routeSet;

      } else {
        response[i].error = true;
      }
    }

  } else {
    response.push({
      fares: {},
      routes: {},
      services: [],
      error: true
    });
  }

  return response;
}

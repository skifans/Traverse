// Dependencies
const RouteSet = require('./RouteSet');
const Fare = require('./Fare');

const DEFAULT_OPTS = {
  'stepFree': false,
  'deptAssistance': false
};

module.exports = async formData => {
  const response = [];

  formData.adults = formData.adults ? parseInt(formData.adults) : 1;
  formData.children = formData.children ? parseInt(formData.children) : 0;
  formData.options = formData.options ? formData.options : DEFAULT_OPTS;
  formData.railcards = formData.railcards ? formData.railcards : false;

  if (formData.legs && Array.isArray(formData.legs)) {

    // Process each leg of the journey
    for (let i = 0; i < formData.legs.length; i++) {
      const leg = formData.legs[i];
      response.push({
        fares: {},
        routes: {},
        error: false
      });

      // Only continue if input for this leg is valid
      if (Fare.isValidCrs(leg.origin, leg.destination) && leg.datetime) {

        // Reformat input
        const leg = formData.legs[i];
        leg.datetime = leg.datetime ? new Date(leg.datetime) : new Date();

        // Construct set of routes for journey
        const routeSet = new RouteSet(leg.origin, leg.destination, leg.datetime);

        // Indicate whether this leg is accessible according to requested needs
        if (formData.options.stepFree) {
          response[i].isStepFree = routeSet.origin.wheelchairAccess && routeSet.destination.wheelchairAccess;
        }
        if (formData.options.deptAssistance) {
          response[i].hasDeptAssistance = routeSet.origin.staffHelp && routeSet.destination.staffHelp;
        }

        // Await async API responses
        const routeFetch = routeSet.fetchRoutes();
        const fareFetch = Fare.fetchFaresForRoute(leg.origin, leg.destination, formData.railcards);

        try {
          const data = await Promise.all([routeFetch, fareFetch]);

          // Push responses to returned array
          const fareData = data[1];
          response[i].fares = fareData;
          response[i].routes = routeSet;
        } catch (err) {
          console.log(err);
          response[i].error = true;
        }

      } else {
        response[i].error = true;
      }
    }

  } else {
    response.push({
      fares: {},
      routes: {},
      error: true
    });
  }

  return response;
}

// Dependencies
const codeMap = require('../assets/crs-codes.json');

const LIMIT = 15;

module.exports = input => {
  // Lowercase input for comparison and get station names from keys
  input = input.toLowerCase().replace(/'/, '');
  const stationNames = Object.keys(codeMap);

  let results = stationNames
    // Filter for names starting with input or CRS == input
    .filter(name => 
      name.toLowerCase().split(' ').some(word => word.startsWith(input)) ||
      codeMap[name].toLowerCase() === input)

    // Sort like so...
    .sort((n1, n2) => {
      // If input could be a valid CRS...
      if (input.length === 3) {
        // If either station's CRS == input, always sort it first
        if (codeMap[n1].toLowerCase() === input) {
          return -1;
        } else if (codeMap[n2].toLowerCase() === input) {
          return 1;
        }
      }

      // Default comparison based on where input string lies in station names
      const comp = n1.toLowerCase().indexOf(input) - n2.toLowerCase().indexOf(input);
      // If at same position, return first alphabetically
      if (comp === 0) {
        return n1 < n2 ? -1 : 1;
      }

      return comp;
    })

    // Only include first LIMIT stations
    .slice(0, LIMIT)

    // Map to simple output string
    .map(stationName => ({
      stationName,
      crs: codeMap[stationName]
    }));

  return results;
}

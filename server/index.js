const express = require('express');
const app = express();
const path = require('path');

const restrictionDecoder = require('./modules/restriction-decoder');
const Fare = require('./modules/Fare');
const crsLookup = require('./modules/crs-lookup');

const PORT = 3001;
const BUILD_DIR = path.join(__dirname, '/../', 'traverse-react', 'build');

// Server set up
app.use(express.json())
app.use(express.static(BUILD_DIR));
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// Default home page
app.get('/', (req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

// --- API endpoints ---
// Restriction code lookup given TRC
app.get('/api/restriction-codes/:code', (req, res) => {
  const codeObj = restrictionDecoder(req.params.code);
  res.send(codeObj);
});

// Fares for a given route
app.get('/api/route-fares/:orig/:dest', (req, res) => {
  Fare.fetchFaresForRoute(req.params.orig, req.params.dest)
    .then(fares => res.send(fares));
});

// CRS code lookup given partial station name
app.get('/api/crs-lookup/:input', (req, res) => {
  const results = crsLookup(req.params.input);
  res.send(results);
});

// Fares for a given routes
app.post('/api/route-fares', (req, res)=>{
  console.log(req.body)
})

// Website listener, should be changed when website will be deployed
app.listen(PORT, () =>
  console.log(`Traverse app listening on port ${PORT}!`)
);

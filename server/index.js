const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const restrictionDecoder = require('./modules/restriction-decoder');

const PORT = 3001;

// Server set up
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Default home page
const buildDir = path.join(__dirname, '/../', 'traverse-react', 'public');
app.use('/', express.static(buildDir));
app.get('/', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

// Route for restriction code search
app.get('/restriction-codes/:code', (req, res) => {
  
});

app.get('/api/restriction-codes/:code', (req, res) => {
  const codeObj = restrictionDecoder(req.params.code);

  res.header('Content-Type', 'text/json');
  res.send(codeObj);
});

// Website listener, should be changed when website will be deployed
app.listen(PORT, () =>
  console.log(`Traverse app listening on port ${PORT}!`)
);

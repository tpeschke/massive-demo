const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const connectionString = 'postgres://mwimifsdpjppqw:8e8337f293b92d86bce21234e636aa1d1fbb46ccde59404e25edde93334dbc15@ec2-23-21-231-58.compute-1.amazonaws.com:5432/d26k13cfu88ecv?ssl=true'

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  const db = req.app.get('db');
  db.getAllInjuries().then(injuries => {
    res.send(injuries)
  })
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;

  if (state) {
    db.getIncidentsByState([state]).then(incidents => {
      res.send(incidents)
    })
  } else {
    db.getAllIncidents().then(incidents => {
      res.send(incidents)
    })
  }
});

app.post('/incidents', (req, res) => {
  const incident = req.body;
  const db = req.app.get('db');

  db.createIncident([
    incident.state,
    incident.injuryId,
    incident.causeId
  ]).then(results => {
    res.send(results);
  });
});

app.patch('/incidents/:id', (req,res) => {
    const id = req.params.id;
    const db = req.app.get('db');
    const fields = req.bodyParser

    db.updateIncident([fields.state: id]).then(results => {
      res.send(results)
    })
    res.send(id)
});


massive(connectionString).then(db => {
  app.set('db', db)
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
});

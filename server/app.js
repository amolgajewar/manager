const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./models/index.js');
require('dotenv').config({path: '../.env'});

const app = express();

app.use(express.static(path.join(__dirname, '/../public')));

app.use(bodyParser.json());

app.get('/api/projects',(req, res) => {
  if(req.query.id) {
    models.readOneProject(req.query.id, (err, results) => {
      if(err) {
        res.status(500).send();
        res.end();
      } else {
        res.status(200).send(results);
        res.end();
      }
    });
  } else {
    models.readAllProjects((err, results) => {
      if(err) {
        res.status(500).send();
        res.end();
      } else {
        res.status(200).send(results);
        res.end();
      }
    });
  }
});

app.post('/api/projects',(req, res) => {
  console.log(req.body);
  models.writeOneProject(req.body, (err, results) => {
    if(err) {
      res.status(500).send();
      res.end();
    } else {
      res.status(201).json(results);
      res.end();
    }
  });
});

app.put('/api/projects',(req, res) => {
  console.log(req.body);
  models.updateOneProject(req.body, (err, results) => {
    if(err) {
      res.status(500).send();
      res.end();
    } else {
      res.status(201).json(results);
      res.end();
    }
  });
});

app.delete('/api/projects',(req, res) => {
  console.log(req.query.id);
  models.deleteOneProject(req.query.id, (err, results) => {
    if(err) {
      res.status(500).send();
      res.end();
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.listen(process.env.SERVER_PORT, ()=> {
  console.log('Express Manager listening on ' + process.env.SERVER_PORT);
});
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();

app.set('port', (process.env.PORT || 8080));
app.use(compression());
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(__dirname + '/public'));

var heroes = [
  {id: 11, name: 'Mr. Nice'},
  {id: 12, name: 'Narco'},
  {id: 13, name: 'Bombasto'},
  {id: 14, name: 'Celeritas'},
  {id: 15, name: 'Magneta'},
  {id: 16, name: 'RubberMan'},
  {id: 17, name: 'Dynama'},
  {id: 18, name: 'Dr IQ'},
  {id: 19, name: 'Magma'},
  {id: 20, name: 'Tornado'},
];

app.get('/app/heroes', function(req, res) {
  var name = req.query.name;
  if (name) {
    name = name.toLowerCase();
    var results = _.filter(chidioms, function(hero) {
      return _.includes(chidiom.name.toLowerCase(), name);
    });
    res.json(results);
  } else {
    res.json(chidioms);
  }
});

app.post('/app/chidioms', function(req, res) {
  var hero = req.body;
  if (typeof chidiom.name === "string") {
    var newId = 1;
    _.forEach(heroes, function(result) {
      newId = Math.max(newId, result.id);
    });
    res.json({ id: newId, name: chidiom.name });
  } else {
    res.sendStatus(400);
  }
});

app.put('/app/chidioms/:id', function(req, res) {
  const chidiomId = +req.params.id;
  var hero = _.find(chidioms, function(chidiom) { return chidiom.id === chidiomId; });
  if (chidiom) {
    chidiom.name = req.body.name;
    res.json(chidioms);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/app/chidioms/:id', function(req, res) {
  const chidiomId = +req.params.id;
  var chidiom = _.find(chidioms, function(chidiom) { return chidiom.id === chidiomId; });
  if (chidiom) {
    for(var i = 0; i < chidioms.length; i++) {
      var chidiom = chidioms[i];
      if (chidiom.id === chidiomId) {
        chidioms.splice(i, 1);
        break;
      }
    }
    res.json(chidioms);
  } else {
    res.sendStatus(404);
  }
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/src/html/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

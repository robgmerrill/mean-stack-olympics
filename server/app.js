"use strict";

let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + '/../client') );


app.get('/sports', (request, response) => {
  let sports = mongoUtil.sports();
  sports.find().toArray((err, docs) => {
    console.log(JSON.stringify(docs));
    let sportNames = docs.map((sport) => sport.name);
  response.json(sportNames);
  });
});

app.get('/sports/:name', (request, response) => {
  let sportName = request.params.name;

  let sports = mongoUtil.sports();
  sports.find({name: sportName}).limit(1).next((err, doc) => {
    if(err) {
      response.sendStatus(400);
    }
  console.log("Sport doc: ", doc); 
  response.json(doc);
});
});

app.listen(3000, () => console.log('Listening on port 3000'));

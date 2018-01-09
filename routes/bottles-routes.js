'use strict';

const bodyParser = require('body-parser');
const Bottle = require(__dirname + '/../models/bottles-model');

const helpers = require('./bottles-helpers');

module.exports = (apiRouter) => {
  apiRouter.route('/bottles')
    .get((req, res) => {
      console.log('GET route hit for /bottles');
      Bottle.find({}).exec((err, bottles) => {
        res.json(bottles);
        res.end();
      });

    })
    .post((req, res) => {
      console.log('POST route hit for /bottles');
      var newBottle = new Bottle(req.body);
    newBottle.save((err, bottle) => {
      res.json(bottle);
    });
    });

  apiRouter.route('bottles/:id')
    .get((req, res) => {
      console.log('GET route hit for /bottles/:id');
      Bottle.findById(req.params.id, (err, bottle) => {
        if (err) return res.send(err);
        res.json(bottle);
      })
    })
    .put((req, res) => {
      console.log('PUT route hit for /bottles/:id');
      Bottle.findByIdAndUpdate({_id: req.params.id}, req.body, (err, bottle) => {
        if (err) return res.send(err);
        res.json(bottle);
      });
    })
    .delete((req, res) => {
      console.log('DEL route hit for /bottles/:id');
      Bottle.findById(req.params.id, (err, bottle) => {
        bottle.remove((err, bottle) => {
          res.json({message: 'bottle deleted'});
        })
      })
    })
};

'use strict';

const Bottle = require(__dirname + '/../models/bottles-model');

function createResponse() {
    let bottleArray = [];
    // bottleArray = retrieveBottles();
    // debug;
    bottleArray = bottleArray.map((instance) => {
        return {
            messageBody: instance.body,
            createdOn: instance.createDate,
            createdAt: instance.location,
            replyEnabled: instance.email ? true : false
        }
    })
}

function retrieveBottles() {
    let bottleResults = [];
   bottleResults = Bottle.find({}).limit(3);
    return bottleResults;
  
}

return createResponse();
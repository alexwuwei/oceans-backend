var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var request = chai.request;
var http = require('http');
require('../server.js');
var Customer = require('../models/bottles-model');
var Product = require('../models/products-model');

describe('testing routes for /bottles resource', () => {
  it('should hit a GET route for /bottles', (done) => {
    request('localhost:3000')
    .get('/bottles')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('should hit a POST route for /bottles', (done) => {
    request('localhost:3000')
    .post('/bottles')
    .send({"name":"testname", "age":"25", "email":"someemail@email.com"})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('body');
      expect(res.body).to.have.property('createDate');
      expect(res.body).to.have.property('upvotes');
      expect(res.body).to.have.property('downvotes');
      expect(res.body).to.have.property('email');
      done();
    });
  });
});

describe('testing routes for /bottles/:id resource', () => {
  it('should hit a GET route for /bottles/:id', (done) => {
    request('localhost:3000')
    .get('/bottles/56ead7f050679f3254d0113d')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.text).to.include('name');
      done();
    });
  });
  it('should hit a PUT route for /bottles/:id', (done) => {
    request('localhost:3000')
    .put('/bottles/56ead7f050679f3254d0113d')
    .send({"name":"testname", "age":"25", "email":"someemail@email.com"})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.text).to.include('name');
      expect(res.text).to.include('value');
      done();
    });
  });
});

describe('testing PUT/DELETE routes for /bottles', () => {
  before((done) => {
    var testCustomer = new Customer({name: 'Test Gordon', age: '26', email: 'sometestemail@gmail.com'});
    testCustomer.save(function(err, data) {
      if (err) throw err;

      this.testCustomer = data;
      done();
    }.bind(this));
  });
  it('should create test customer entry', () => {
    expect(this.testCustomer.name).to.equal('Test Gordon');
    expect(this.testCustomer).to.have.property('_id');
  });
  it('should hit a PUT route for /bottles/:id', (done) => {
    var id = this.testCustomer._id;
    request('localhost:3000')
    .put('/bottles/' + id)
    .send({name: 'Not Gordon', age: '62', email: 'adifferentemail@em.com'})
    .end((err, res) => {
      expect(err).to.eql(null);
      done();
    });
  });
  it('should hit a DEL route for /bottles/:id', (done) => {
    request('localhost:3000')
    .del('/bottles/' + this.testCustomer._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      done();
    });
  });
});

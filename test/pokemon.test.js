'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

chai.should();

chai.use(chaiHttp);

describe('/GET pokemons', () => {
  it('it should GET 0 pokemons name ale', (done) => {
    chai.request(server)
      .get('/pokemons?name=ale')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done(err, res);
      });
  });

  it('it should GET at least 2 pokemons name mew', (done) => {
    chai.request(server)
      .get('/pokemons?name=mew')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.above(1);
        done(err, res);
      });
  });
});

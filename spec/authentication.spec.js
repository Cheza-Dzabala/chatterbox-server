const server = require("../server");
var chai = require("chai"),
  chaiHttp = require("chai-http");
const { expect } = require("chai");
const {
  missingUserName,
  validUser,
  validUserLogin,
  missingPasswordLogin,
  badEmailUserLogin,
} = require("./data/users");
const { validationStrings } = require("../strings/response_strings");
const { configure, destroy } = require("../db/setup");

chai.use(chaiHttp);

describe("Authentication ", () => {
  before(async () => {
    await configure();
  });

  after(async () => {
    await destroy();
  });

  describe("When a user tries to register it", () => {
    it("Should not access route with 'GET' request", (done) => {
      chai
        .request(server)
        .get("/register")
        .send(validUser)
        .end((err, res) => {
          expect(res.status).to.equal(405);
          expect(res.body.data.message).to.equal(
            "Method not allowed on this route"
          );
          done();
        });
    });
    it("Should register user successfully", (done) => {
      chai
        .request(server)
        .post("/register")
        .send(validUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.have.property("token");
          done();
        });
    });

    it("Should not register a user with duplicate usernames", (done) => {
      chai
        .request(server)
        .post("/register")
        .send(validUser)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.data).to.not.have.property("token");
          done();
        });
    });

    it("Should not register successfully without username", (done) => {
      chai
        .request(server)
        .post("/register")
        .send(missingUserName)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.data).to.equal(validationStrings.usernameRequired);
          expect(res.body.message).to.equal("validation errror");
          done();
        });
    });
  });

  describe("When a user tries to log in it", () => {
    it("Should not access route with 'GET' request", (done) => {
      chai
        .request(server)
        .get("/login")
        .send(validUserLogin)
        .end((err, res) => {
          expect(res.status).to.equal(405);
          expect(res.body.data.message).to.equal(
            "Method not allowed on this route"
          );
          done();
        });
    });
    it("Should log in successfully", (done) => {
      chai
        .request(server)
        .post("/login")
        .send(validUserLogin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.property("token");
          done();
        });
    });

    it("Should not log in without password", (done) => {
      chai
        .request(server)
        .post("/login")
        .send(missingPasswordLogin)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });
    it("Should not log in with non existent email", (done) => {
      chai
        .request(server)
        .post("/login")
        .send(badEmailUserLogin)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });
});

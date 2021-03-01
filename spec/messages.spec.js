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

describe("Messages ", () => {
  let token;
  before(async () => {
    await configure();
    chai
      .request(server)
      .post("/register")
      .send(validUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        token = res.body.data.token;
      });
  });

  describe("When a user tries to access messages ", () => {
    it("It should not allow new messages if no token is present", (done) => {
      chai
        .request(server)
        .get("/messages")
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it("It should not allow new messages if no token is malformed", (done) => {
      chai
        .request(server)
        .get("/messages")
        .set("authorization", "Bearer skdoskdpsodkp")
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it("It should get all messages when user is authenticated", (done) => {
      chai
        .request(server)
        .get("/messages")
        .send(validUser)
        .set("authorization", `Bearer ${token}`)
        .end((err, res) => {
          console.log("Token:::", token);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  after(async () => {
    try {
      await destroy();
    } catch (e) {
      console.log("Destrtoy err", e.message);
    }
  });
});

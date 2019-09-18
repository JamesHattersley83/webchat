const request = require("supertest");
const chai = require("chai");
let server;

describe("user.js", () => {
  beforeEach(() => {
    server = require("../../main");
  });
  afterEach(() => {
    server.close();
  });
  describe("login", () => {
    it("should return a status of 200", () => {
      request(server)
        .post("/:username")
        .expect(200);
    });
  });
  describe("register", () => {
    it("should return a status of 201", () => {
      request(server)
        .post("/")
        .expect(201);
    });
  });
});

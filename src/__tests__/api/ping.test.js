const app = require("../../server/app");
const supertest = require("supertest");

describe("ping", () => {
  describe("get /api/ping -route", () => {
    it("should return { result: 'pong' }", async () => {
      await supertest(app)
        .get("/api/ping")
        .expect(200)
        .then((response) => {
          expect(response.body.result).toBe("pong");
        });
    });
  });
});

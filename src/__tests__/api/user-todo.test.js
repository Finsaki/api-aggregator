const app = require("../../server/app");
const supertest = require("supertest");
const {
  expectedResponse,
  axiosMockValidData,
  axiosMockInvalidData,
  axiosMockMissingData,
} = require("../../utils/testHelper");
const { TESTDBFILEPATH } = require("../../utils/config");
const {
  initDatabase,
  clearCache,
  closeDatabase,
} = require("../../cache/cacheHelper");

jest.mock("axios");

beforeAll(async () => {
  await initDatabase(TESTDBFILEPATH);
});

beforeEach(async () => {
  await clearCache();
});

afterAll(async () => {
  await clearCache();
  await closeDatabase();
});

describe("user-todo", () => {
  describe("get /api/user-todo -route", () => {
    describe("given the id is not valid", () => {
      describe("given the id is not a number", () => {
        it("should return a 400", async () => {
          axiosMockValidData();
          const badId = "asd123";
          await supertest(app).get(`/api/user-todo/${badId}`).expect(400);
        });
      });
      describe("given the id is less than 1", () => {
        it("should return a 400", async () => {
          axiosMockValidData();
          const badId = 0;
          await supertest(app).get(`/api/user-todo/${badId}`).expect(400);
        });
      });
    });
    describe("given the id is valid", () => {
      describe("given the id does not exist in the external API", () => {
        it("should return a 404", async () => {
          axiosMockValidData();
          const fakeId = 100;
          await supertest(app).get(`/api/user-todo/${fakeId}`).expect(404);
        });
      });
      describe("given the id exists in the external API", () => {
        it("should return a 200", async () => {
          axiosMockValidData();
          const id = 1;
          await supertest(app).get(`/api/user-todo/${id}`).expect(200);
        });
        it("should match with expected response", async () => {
          axiosMockValidData();
          const id = 1;
          const response = await supertest(app).get(`/api/user-todo/${id}`);
          expect(response.body).toEqual(expectedResponse);
        });
        describe("given the external API response is not valid", () => {
          describe("given the response contains invalid data", () => {
            it("should return a 502", async () => {
              axiosMockInvalidData();
              const id = 1;
              await supertest(app).get(`/api/user-todo/${id}`).expect(502);
            });
          });
          describe("given the response contains missing data", () => {
            it("should return a 502", async () => {
              axiosMockMissingData();
              const id = 1;
              await supertest(app).get(`/api/user-todo/${id}`).expect(502);
            });
          });
        });
      });
    });
  });
});

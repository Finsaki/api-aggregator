const app = require("../../server/app");
const supertest = require("supertest");
const { expectedResponse, axiosMockData } = require("../../utils/testHelper");
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
  axiosMockData();
});

afterAll(async () => {
  await clearCache();
  await closeDatabase();
});

describe("user-todo", () => {
  describe("get /api/user-todo -route", () => {
    describe("given the id does not exist", () => {
      it("should return a 404", async () => {
        const fakeId = 100;
        await supertest(app).get(`/api/user-todo/${fakeId}`).expect(404);
      });
    });
    describe("given the id exists", () => {
      it("should return a 200", async () => {
        const id = 1;
        await supertest(app).get(`/api/user-todo/${id}`).expect(200);
      });
      it("should match with expected response", async () => {
        const id = 1;
        const response = await supertest(app).get(`/api/user-todo/${id}`);
        expect(response.body).toEqual(expectedResponse);
      });
    });
  });
});

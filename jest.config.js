module.exports = {
  testEnvironment: "node",
  testMatch: ["**/**/**/*.test.js"],
  verbose: true,
  forceExit: true,
  //telling Jest to transform Axios ES Mod -> CommonJS
  moduleNameMapper: {
    "^axios$": require.resolve("axios"),
  },
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};

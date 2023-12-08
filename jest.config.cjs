/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-test.ts"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

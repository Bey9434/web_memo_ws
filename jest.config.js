const { set } = require("./backend/src/app");

module.exports = {
  projects: [
    {
      displayName: "backend",
      testEnvironment: "node",
      testMatch: ["<rootDir>/backend/tests/**/*.test.js"],
    },
    {
      displayName: "frontend",
      testEnvironment: "jest-fixed-jsdom",
      testEnvironmentOptions: {
        customExportConditions: [""],
      },
      testMatch: ["<rootDir>/frontend/tests/**/*.test.jsx"],
      setupFilesAfterEnv: ["<rootDir>/frontend/setupTests.js"],
      setupFiles: ["<rootDir>/jest.polyfills.js"],

      moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      },
    },
  ],
};

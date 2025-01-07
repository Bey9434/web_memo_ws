module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^react$": "<rootDir>/frontend/node_modules/react",
    "^react-dom$": "<rootDir>/frontend/node_modules/react-dom",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  cache: false,
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};

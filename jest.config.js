module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: [
    "**/tests/**/*.test.[jt]s?(x)"
  ],
  setupFiles: ["<rootDir>/.jest.env.js"],
  collectCoverage: true
};

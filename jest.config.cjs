module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  testMatch: ["<rootDir>/src/__tests__/**/*.test.ts?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
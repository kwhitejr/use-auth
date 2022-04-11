module.exports = {
  testEnvironment: "jsdom",
  testMatch: [
    // '**/__tests__/**/*.[jt]s?(x)',
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  extensionsToTreatAsEsm: [".jsx"],
  setupFilesAfterEnv: ['./jest.setup.js']
};
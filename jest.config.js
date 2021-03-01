module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "moduleNameMapper":{
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  testTimeout: 30000
};

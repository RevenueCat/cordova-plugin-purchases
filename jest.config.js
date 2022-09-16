export default {
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: "jsdom"
};

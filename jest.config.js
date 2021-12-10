module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(tsx|ts)?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    clearMocks: true,
};

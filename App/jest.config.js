module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp)$": "identity-obj-proxy",
    "\\.(css|less)$": "identity-obj-proxy",
  },
};

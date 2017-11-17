module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true
  },
  "globals": {
    "ShadyCSS": false
  },
  "rules": {
    "no-console": ["error", {
      allow: ["warn", "error"]
    }],
    "no-underscore-dangle": "off",
    "import/extensions": ["error", "always"]
  }
};

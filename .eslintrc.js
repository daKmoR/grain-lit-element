module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true
  },
  "globals": {
  },
  "rules": {
    "no-console": ["error", {
      allow: ["warn", "error"]
    }],
    "no-underscore-dangle": [2, {
      "allowAfterThis": true
    }],

    "class-methods-use-this": 0,
  }
};

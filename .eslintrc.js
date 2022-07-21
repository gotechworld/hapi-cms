module.exports = {
    "env": {
        "browser": false,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended"],
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "prefer-destructuring": ["error", {"object": true, "array": false}],
        "linebreak-style": ["error", "unix"],
        "no-console": 0
    }
};
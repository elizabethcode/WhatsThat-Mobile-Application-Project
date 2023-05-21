module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "ecmaFeatures":{
    "classes": true
  },
  "rules":{
    "react/jsx-filename-extension":["error", { "extensions": [".js","js"]}],
    "linebreak-style":["error", "windows"]
  // env: {
  //   browser: true,
  //   es2021: true,
  // },
  // extends: [
  //   'plugin:react/recommended',
  //   'airbnb',
  // ],
  // overrides: [
  // ],
  // parserOptions: {
  //   ecmaVersion: 'latest',
  //   sourceType: 'module',
  // },
  // plugins: [
  //   'react',
  // ],
  // rules: {
  // },
}};

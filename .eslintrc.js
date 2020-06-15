module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  extends: "standard",
  globals: {
    __static: true,
  },
  plugins: ["html"],
  rules: {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": 0,
    "no-extra-semi": 0,
    "no-undef": 0,
    semi: 0,
    quotes: 0,
    indent: 0,
    curly: 0,
    eqeqeq: 0,
    "no-return-assign": 0,
    "arrow-spacing": 0,
    "block-spacing": 0,
    "no-new": 0,
    "eslint-plugin-vue": 0,
    "spaced-comment": 0,
    "space-before-function-paren": 0,
    "space-before-blocks": 0,
    "no-unused-vars": 0,
    "padded-blocks": 0,
    "no-multiple-empty-lines": 0,
    "new-cap": 0,
    "brace-style": 0,
    "no-useless-escape": 0,
    "handle-callback-err": 0,
    "comma-dangle": 0,
    "no-trailing-spaces": 0,
  },
};

// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'global-require': 0,
    'no-param-reasign': 0,
    'space-unary-ops': 0,
    'indent': 0,
    'quotes': 0,
    'no-trailing-spaces': 0,
    'vue/valid-template-root': 0,
    'no-useless-escape': 0,

    'import/first': 0,
    'import/no-unresolved': 0,
    'import/no-dynamic-require': 0,

  "skipBlankLines": true,
  "ignoreComments": true,

    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

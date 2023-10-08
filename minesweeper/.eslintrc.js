module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'object-curly-newline': 'off',
    'prettier/prettier': [
      'error',
      { trailingComma: 'all', tabWidth: 2, semi: true, singleQuote: true, printWidth: 100 },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['prettier'],
};

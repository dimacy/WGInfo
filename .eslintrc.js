module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:immer-reducer/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react-native/no-inline-styles': 0,
    'react-native/no-unused-styles': 2,
    'no-console': 2,
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    curly: ['error', 'multi-line'],
    ['no-else-return']: 'error',
  },
};

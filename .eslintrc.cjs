module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-no-target-blank': 'off',
    'no-undef': 'off',
    'no-unused-vars': ['warn', { varsIgnorePattern: 'React' }],
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off', 
  },
  globals: {
    process: 'readonly',
  },
};

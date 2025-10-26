module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: ['./tsconfig.json'],
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
    'import',
    'jsx-a11y',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // integrates Prettier
  ],
  rules: {
    // General
    'no-console': 'warn',
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // React
    'react/react-in-jsx-scope': 'off', // not needed for React 17+
    'react/prop-types': 'off',

    // Import order
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
      },
    ],
  },
  ignorePatterns: ['dist', 'node_modules', 'build'],
};

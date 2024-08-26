module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.tsx', '.ts'],
    'import/resolver': {
      typescript: {}
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', 'simple-import-sort', 'unused-imports'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        printWidth: 100,
        trailingComma: 'none',
        arrowParens: 'avoid',
        endOfLine: 'auto',
      }
    ],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'simple-import-sort/imports': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/type-annotation-spacing': [
      'warn',
      {
        after: true
      }
    ],
    'unused-imports/no-unused-imports': 'error',
    'import/no-unresolved': 'off',
    'import/no-relative-parent-imports': 'off',
    // originals
    'comma-spacing': 'warn',
    quotes: ['warn', 'single'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'no-console': [
      'error',
      {
        allow: ['log', 'warn', 'error']
      }
    ],
    'no-unused-vars': ['off'],
    'no-inner-declarations': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 1,
        maxBOF: 0
      }
    ],
    'no-trailing-spaces': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'never'],
    'space-before-blocks': 'warn',
    'space-infix-ops': 'warn',
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'padded-blocks': ['warn', 'never'],
    'eol-last': ['warn', 'always'],
    'keyword-spacing': [
      'warn',
      {
        before: true,
        after: true
      }
    ],
    'arrow-spacing': 'warn',
    'id-denylist': ['warn', 'require'],
    'space-in-parens': ['warn', 'never'],
    '@next/next/no-html-link-for-pages': ['error', 'src/app/'],
  }
}

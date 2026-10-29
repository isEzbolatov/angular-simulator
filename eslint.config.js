const eslint = require('@eslint/js');
const angular = require('angular-eslint');
const tseslint = require('typescript-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    ignores: ['node_modules/**', '.angular/**', 'dist/**'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
      prettierConfig,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'object-curly-spacing': ['warn', 'always'],
      'template-curly-spacing': ['warn', 'always'],
      semi: ['warn', 'always'],
      'padded-blocks': ['error', 'never'],
      'lines-between-class-members': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'no-public', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: { regex: '^I[A-Z]', match: true },
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: ['typeProperty', 'objectLiteralProperty'],
          format: null,
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, prettierConfig],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': 'warn',
    },
  },
);

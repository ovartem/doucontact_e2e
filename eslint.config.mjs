import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwrightPlugin from 'eslint-plugin-playwright';

export default [
  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  {
    files: ['tests/**/*.ts'],
    plugins: {
      playwright: playwrightPlugin,
    },
    rules: {
      'playwright/no-skipped-test': 'warn',
      'playwright/no-focused-test': 'error',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/valid-title': 'error',
      'playwright/expect-expect': 'warn',
      'playwright/valid-expect': 'off',
    },
  },
];
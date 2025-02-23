import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin, // Dodajemy plugin "import"
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-empty-object-type': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      /*      // Group imports to enforce order
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-ins
            'external', // External packages installed with npm
            'internal', // Internal modules
            ['parent', 'sibling', 'index'], // Parent, sibling, and index files
            'object', // For additional groupings
            'type', // Flow or TypeScript types
            'unknown', // Any unknown grouping
            'style', // CSS/SCSS imports
          ],
          pathGroups: [
            {
              pattern: '*.css',
              group: 'style',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],*/
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'import/no-default-export': ['error'],
    },
  }
);

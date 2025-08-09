// eslint.config.js
import js from '@eslint/js';
import path from 'node:path';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { FlatCompat } from '@eslint/eslintrc';

// FlatCompat ayarı (ESLint 9 için recommendedConfig ve allConfig ekledik)
const compat = new FlatCompat({
  baseDirectory: path.resolve(process.cwd()),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Ignore listesi
const ignores = [
  '.next/**',
  'node_modules/**',
  'public/**',
  'contentlayer/**',
  'dist/**',
];

export default [
  { ignores },

  // JS kuralları
  js.configs.recommended,

  // TypeScript kuralları
  ...tseslint.configs.recommended,

  // React kuralları
  {
    plugins: { react },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
    settings: { react: { version: 'detect' } },
  },

  // Next.js kuralları (legacy olduğu için compat ile)
  ...compat.config({ extends: ['next', 'next/core-web-vitals', 'prettier'] }),

  // Proje genel kuralları
  {
    files: ['**/*.{js,jsx,ts,tsx,d.ts}'],
    plugins: { 'simple-import-sort': simpleImportSort },
    languageOptions: { globals: { React: 'writable', JSX: 'writable' } },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': 'warn',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^next'],
            ['^@?\\w'], // npm paketleri
            ['^(@|components)(/.*|$)'], // proje içi modüller
            ['^\\.'], // relative importlar
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
];

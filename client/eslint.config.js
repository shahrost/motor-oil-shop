import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // build و dist خروجی بیلد هستند (بسته به RUNFLARE)
  globalIgnores(['dist', 'build']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: ['src/components/**/*.{js,jsx}', 'src/context/**/*.{js,jsx}', 'src/hooks/**/*.{js,jsx}', 'src/utils/**/*.{js,jsx}'],
    ignores: ['**/__tests__/**'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{ group: ['**/api/apiClient', '**/api/apiClient.js'], message: 'API requests belong in src/services; call a service from the hook.' }],
      }],
    },
  },
  // فایل تنظیمات Vite در Node اجرا می‌شه
  {
    files: ['vite.config.js', 'priceReaderAssets.js'],
    languageOptions: { globals: globals.node },
  },
])

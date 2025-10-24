        // .eslintrc.js
        module.exports = {
          env: {
            browser: true,
            es2021: true,
            node: true
          },
          extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended'
          ],
          parserOptions: {
            ecmaFeatures: {
              jsx: true
            },
            ecmaVersion: 'latest',
            sourceType: 'module'
          },
          plugins: [
            'react',
            'react-hooks'
          ],
          rules: {
            'no-unused-vars': 'warn', // Измените на 'off', чтобы отключить правило
            'react/prop-types': 'off', // Отключает проверку prop-types в React (если вы их не используете)
            // Здесь можно добавлять другие правила ESLint
          },
        };
        

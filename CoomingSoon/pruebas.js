module.exports = {
  parserOptions: {
    root: true, // ESLint dejará de buscar otras configuraciones en cascada en las carpetas principales
    ecmaVersion: 2020, // Permite el análisis de funciones modernas de ECMAScript
    sourceType: 'module', // Permite el uso de importaciones.
    ecmaFeatures: {
      jsx: true // Permite el análisis de JSX
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['simple-import-sort'],
  settings: {
    react: {
      version: 'detect' // Le dice a eslint-plugin-react que detecte automáticamente la versión de React a usar
    }
  },
  extends: [ //Uso de archivos de configuración
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended', // Utiliza las reglas recomendadas de @eslint-plugin-react
    'plugin:prettier/recommended', // Habilita eslint-plugin-prettier y eslint-config-prettier. Esto mostrará errores más bonitos como errores de ESLint. Asegúrese de que esta sea siempre la última configuración en la matriz extendida.
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    'no-console': ['error'], //No permite el uso de console. muestra un error
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/sort': 'error',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        whitelist: {
          getStaticProps: true
        }
      }
    ],
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true
        }
      }
    ]
  },
  overrides:[
    { // reglas especificas para archivos o grupos de archivos especificos en direcciones especificas
      "files": ["bin/*.js", "lib/*.js"],
      "excludedFiles": "*.test.js",
      "rules": {
        "quotes": ["error", "single"]
      }
    }
  ]
};
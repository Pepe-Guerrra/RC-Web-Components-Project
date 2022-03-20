// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:node/recommended', //eslint-plugin-node
    'plugin:@typescript-eslint/recommended' //typescript-eslint
  ],
  parser: '@typescript-eslint/parser', //indica el módulo npm para usar como su analizador
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021
  },
  rules: {
    eqeqeq: [  //operadores de igualdad de tipo seguro ===y !==en lugar de sus homólogos habituales ==y !=.
      'warn', 'always', { null: 'never' } 
      //'warn', 'always', lanza una advertenci cada vez que se usa == y !=
      // { null: 'never' } Nunca use === o !== con null
    ], 
    'no-debugger': ['error'], //Esta regla no permite la declaracion "debugger" 
    'no-empty': [ 'warn', //No permite sentencias de bloques vacíos y lanza una advertencia
      { allowEmptyCatch: true } //permite cláusulas vacías catch
    ],
    'no-var': 'error', //Requiere let o const en lugar de var.
    'quotes': [ //Refuerza el uso consistente de acentos graves, comillas dobles o simples.
      'error',
      'single', //requiere el uso de comillas simples siempre que sea posible
      { avoidEscape: true } //permite comillas simples dentro de comillas dobles
    ]
    'no-process-exit': 'off', // No permite el uso de process.exit() apagada "extends": ["plugin:node/recommended"],
    'no-useless-escape': 'off', //No permite caracteres de escape innecesarios. apagada "extends": ["eslint:recommended"]
    'prefer-const': [ 'warn', //Requiere "const" declaraciones para variables que nunca se reasignan después de declaradas.
      {
        destructuring: 'all' //Si todas las variables en desestructuración deben ser const, esta regla advierte a las variables. De lo contrario, los ignora.
      }
    ],
    'node/no-missing-import': [//no permitir importdeclaraciones que importen módulos de inexistencia
      'error', //Esta regla está incluida en el plugin:node/recommended
      {
        allowModules: [
          'types',
          'estree',
          'testUtils',
          'less',
          'sass',
          'stylus'
        ],
        tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts']
      }
    ],
    'node/no-missing-require': [
      'error',
      {
        // for try-catching yarn pnp
        allowModules: ['pnpapi', 'vite'],
        tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts']
      }
    ],
    'node/no-restricted-require': [
      'error',
      Object.keys(require('./packages/vite/package.json').devDependencies).map(
        (d) => ({
          name: d,
          message:
            `devDependencies can only be imported using ESM syntax so ` +
            `that they are included in the rollup bundle. If you are trying to ` +
            `lazy load a dependency, use (await import('dependency')).default instead.`
        })
      )
    ],
    'node/no-extraneous-import': [
      'error',
      {
        allowModules: ['vite', 'less', 'sass']
      }
    ],
    'node/no-extraneous-require': [
      'error',
      {
        allowModules: ['vite']
      }
    ],
    'node/no-deprecated-api': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-unsupported-features/es-syntax': 'off',

    '@typescript-eslint/ban-ts-comment': 'off', // TODO: we should turn this on in a new PR
    '@typescript-eslint/ban-types': 'off', // TODO: we should turn this on in a new PR
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['arrowFunctions'] }
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // maybe we should turn this on in a new PR
    '@typescript-eslint/no-extra-semi': 'off', // conflicts with prettier
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off', // maybe we should turn this on in a new PR
    '@typescript-eslint/no-unused-vars': 'off', // maybe we should turn this on in a new PR
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' }
    ]
  }
});

module.exports = {
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript'
  ],
  overrides: [
    {
      files: [
        '*.vue'
      ],
      rules: {
        'no-undef': [0]
      }
    }
  ],
  'rules': {
    'sort-imports': [
      'error',
      {
        'allowSeparatedGroups': true,
        'ignoreCase': true,
        'ignoreDeclarationSort': false,
        'ignoreMemberSort': false,
        'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
      }
    ],
    'no-unused-vars': [0],
    'no-unexpected-multiline': [0],
    'no-var': [1],
    'prefer-const': [1],
    'prefer-spread': [0],
    'quotes': [2, 'single'],
    'vue/no-unused-components': [1],
    'vue/require-valid-default-prop': [1],
    'vue/require-v-for-key': [1],
    'vue/html-quotes': [2, 'double'],
    'vue/html-self-closing': [
      1,
      {
        'html': {
          'component': 'always'
        }
      }
    ],
    'vue/require-prop-types': 2,
    'vue/attributes-order': [
      2,
      {
        'order': [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ]
      }
    ],
    'vue/order-in-components': [
      1,
      {
      'order': [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }
    ]
  }
}
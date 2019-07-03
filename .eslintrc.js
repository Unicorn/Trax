module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  env: {
    browser: true,
    amd: true,
    es6: true,
    node: true
  },
  globals: {
    "__static": true
  },
  rules: {
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/member-delimiter-style": ["warn", {
      multiline: {
        delimiter: "none",
        requireLast: false
      },
    }],
    "@typescript-eslint/explicit-function-return-type": ["warn", {
      "allowExpressions": true,
      "allowTypedFunctionExpressions": true
    }],
    "@typescript-eslint/camelcase": ["error", {
      "allow": ["per_page", "issue_number"]
    }],
    "react/prop-types": "off"
  },
  overrides: [
    {
      "files": ["./src/**/*.ts", ".src/**/*.tsx"],
      "excludedFiles": "*.test.ts"
    }
  ],
  settings: {
    "react": {
      "version": "detect"
    }
  }
}

// oxlint.config.js
module.exports = {
  rules: {
    // React specific rules
    'react/no-array-index-key': 'warn',
    'react/jsx-key': 'error',
    'react/react-in-jsx-scope': 'off', // React 17+ doesn't need import
    'react/prop-types': 'off', // Using TypeScript or not
    'react/jsx-no-target-blank': 'warn',
    
    // General JavaScript rules
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    
    // Stylistic rules
    'indent': ['warn', 2],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always'],
    'comma-dangle': ['warn', 'always-multiline'],
  },
  plugins: ['react'],
};
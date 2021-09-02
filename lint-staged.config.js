module.exports = {
  '**/*.ts?(x)': () => 'npm run typecheck',
  '*.{js,jsx,ts,tsx}': 'npm run lint',
}

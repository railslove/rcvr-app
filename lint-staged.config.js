module.exports = {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '*.{js,jsx,ts,tsx}': 'npm run lint --cache --fix',
}

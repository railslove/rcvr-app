module.exports = {
  '*.@(ts|tsx)': ['yarn lint', 'yarn format'],
  '*.{js,css,md}': 'prettier --write',
  '*.{js,jsx,ts,tsx}': 'eslint --cache --fix',
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
}

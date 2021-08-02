import glob from 'glob'

glob('pages/**.{de,en,pl}.{ts,json}', (error, result) => {
  if (error) {
    throw error
  }

  console.log('result', result)
})

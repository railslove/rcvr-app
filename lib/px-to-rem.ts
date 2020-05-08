type RemifiedArray = string[]
type RemifiedObject = { [key: string]: string }

// Turns an array of pixel-values into an array of css-rem values
export function withArray(pxs: number[]): RemifiedArray {
  return pxs.map((px) => px / 16).map((rem) => `${rem}rem`)
}

// Turns an object with pixels-values into an object with the css-rem values
export function withObject(pxs: { [key: string]: number }): RemifiedObject {
  return Object.keys(pxs).reduce((acc, key) => {
    acc[key] = pxs[key] / 16 + 'rem'
    return acc
  }, {})
}

export const readTextFile = async (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result as string)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsText(file)
  })
}

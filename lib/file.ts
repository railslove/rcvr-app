export const readTextFile = async (file: Blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            resolve(e.target.result)
        }
        reader.onerror = (error) => {
            reject(error)
        }
        reader.readAsText(file)
    })
}
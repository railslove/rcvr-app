export default function passwordStrength(password): -1 | 0 | 1 | 2 {
  if (!password) {
    return -1
  }

  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$&+,:;=?@#|'<>.^*()%!-\[\]{}])(?=.{8,})/g
  const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/g

  if (strongRegex.test(password)) {
    return 2
  } else if (mediumRegex.test(password)) {
    return 1
  } else {
    return 0
  }
}

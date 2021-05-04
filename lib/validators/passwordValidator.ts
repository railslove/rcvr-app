import * as Yup from 'yup'

export const passwordValidator = Yup.string()
  .required('Passwort muss angegeben werden.')
  .max(128, 'Das Passwort darf nicht länger als 128 Zeichen sein.')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-[\]{}])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-[\]{}]{8,128}$/,
    'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.'
  )

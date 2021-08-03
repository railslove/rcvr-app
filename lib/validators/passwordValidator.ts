import * as Yup from 'yup'

export type PasswordValidatorProps = Partial<{
  requiredText: string
  maxLengthText: string
  shouldMatchText: string
}>

export const createPasswordValidator = ({
  requiredText = 'Passwort muss angegeben werden.',
  maxLengthText = 'Das Passwort darf nicht länger als 128 Zeichen sein.',
  shouldMatchText = 'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.',
}: PasswordValidatorProps) =>
  Yup.string()
    .required(requiredText)
    .max(128, maxLengthText)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-[\]{}])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-[\]{}]{8,128}$/,
      shouldMatchText
    )

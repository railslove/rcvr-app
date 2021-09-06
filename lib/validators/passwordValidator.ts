import * as Yup from 'yup'

export type PasswordValidatorProps = {
  requiredText: string
  maxLengthText: string
  shouldMatchText: string
}

export const createPasswordValidator = ({
  requiredText,
  maxLengthText,
  shouldMatchText,
}: PasswordValidatorProps) =>
  Yup.string()
    .required(requiredText)
    .max(128, maxLengthText)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-[\]{}])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-[\]{}]{8,128}$/,
      shouldMatchText
    )

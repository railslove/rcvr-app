import * as Yup from 'yup'

import { isValidPhoneNumber } from 'libphonenumber-js/max'

export type PhoneValidatorProps = {
  name: string
  invalid: string
  required: string
}

export const createPhoneValidator = ({
  name,
  invalid,
  required,
}: PhoneValidatorProps) =>
  Yup.string()
    .required(required)
    .test({
      name,
      test: (value) => {
        return isValidPhoneNumber(value || '', 'DE')
      },
      message: invalid,
    })

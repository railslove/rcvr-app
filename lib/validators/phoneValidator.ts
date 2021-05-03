import * as Yup from 'yup'

import { isValidPhoneNumber } from 'libphonenumber-js/max'

export const phoneValidator = Yup.string()
  .required('Telefonnummer muss angegeben werden.')
  .test({
    name: 'phoneNumber',
    test: (value) => {
      return isValidPhoneNumber(value || '', 'DE')
    },
    message: 'Telefonnummer ist nicht im richtigen Format',
  })

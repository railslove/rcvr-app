import * as Yup from 'yup'

import { isValidPhoneNumber } from 'libphonenumber-js/max'
import { SupportedLanguage } from '~locales/types'

export type PhoneValidatorProps = {
  lang: SupportedLanguage
  name: string
  invalid: string
  required: string
}

export const createPhoneValidator = ({
  name,
  lang,
  invalid,
  required,
}: PhoneValidatorProps) =>
  Yup.string()
    .required(required)
    .test({
      name,
      test: (value) => {
        return isValidPhoneNumber(
          value || '',
          (lang === 'de' && 'DE') || (lang === 'en' && 'US') || 'DE'
        )
      },
      message: invalid,
    })

import de from './validatorsLocales.de'

const validatorsLocalesEN: typeof de = {
  zipLabel: 'zip code',
  zipRequired: 'Postal code must be specified',

  cityLabel: 'City',
  cityRequired: 'City must be specified.',

  nameLabel: 'Your name',
  nameRequired: 'Name must be specified.',

  emailLabel: 'Email',
  emailRequired: 'Email must be specified.',

  phoneLabel: 'Your phone number',
  phoneInvalid: 'Phone number is not in the correct format',
  phoneRequired: 'Phone number must be specified',

  passwordLabel: 'Password',
  passwordHint:
    'Password must be at least 8 characters long. At least one uppercase letter, one lowercase letter, one number and one special character.',
  passwordConfirmLabel: 'Repeat password',
  passwordRequired: 'Password must be specified',
  passwordMaxLength: 'Password must not be longer than 128 characters',
  passwordsDoNotMatch: 'Passwords do not match.',
  passwordShouldMatch:
    'Password must be at least 8 characters long. At least one uppercase letter, one lowercase letter, one number and one special character.',
  confirmPasswordRequired: 'Password repetition must be specified.',

  streetLabel: 'Street and house number',
  streetRequired: 'Street must be specified',

  addressLabel: 'Address',
  addressRequired: 'Address must be specified.',

  companyNameLabel: 'name of your company',
  companyNameRequired: 'Company name must be specified',

  confirmContractRequired: 'You must agree to the contract.',
}

export default validatorsLocalesEN

import de from '~ui/blocks/SepaForm.de'

const en: typeof de = {
  ibanInvalid: 'IBAN is invalid',
  ibanRequired: 'IBAN must be specified',
  nameRequired: 'Account holder must be specified',
  emailRequired: 'Email must be specified.',

  ibanInputLabel: 'IBAN',
  nameInputLabel: 'Account holder',
  emailInputLabel: 'Email',

  consentText: `I/we authorize (A) Ping Pong Labs GbR and Stripe,
  our payment service provider, to debit payments from my/ our account
  by direct debit. At the same time (B) I/we instruct my/our
  our credit institution to debit the payments made by Ping Pong Labs GbR and Stripe,
  our payment service provider, to my/our account direct debits to my/our account`,

  submitButtonText: 'Confirm SEPA direct debit',
}

export default en

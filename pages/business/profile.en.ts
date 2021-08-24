import validatorsLocalesEN from '~lib/validators/validatorsLocales.en'
import de from '~pages/business/profile.de'

const en: typeof de = {
  ...validatorsLocalesEN,

  pageTitle: 'My Profile',
  editProfile: 'Edit Profile',
  myMembership: 'My membership',
  hasNoCompaniesMessage: `You must create a company first `,
  writeEmailMessage: 'If you want to continue using recover, please email us.',
  writeEmailButtonText: 'Write an email',
  upgradeNow: 'upgrade now',

  pricingInfo_care: `You can put recover through its paces for 14 days free of charge.
  After that, membership costs 29.90€ incl. VAT per month and per
  care facility. The membership can be cancelled at any time
  at the end of the month`,

  pricingInfo_health1: `You can test recover for 14 days free of charge. After that the
  membership costs for all hospitals with a size of up to 199 beds
  199€ per month, for all hospitals with a size from 200 to
  499 beds 349€ per month and for all hospitals with a size
  of 500 beds 449€ per month with a minimum term of 6 months.
  of 6 months.`,

  pricingInfo_health2: `If you have any questions about pricing, please feel free to contact our support team at
  at team@recoverapp.de`,

  pricingInfo_fresenius1: `You can put recover through its paces for 14 days free of charge.`,
  pricingInfo_fresenius2: `After that the membership costs 15€ incl. VAT per month and company.
  The membership can be canceled at any time to the end of the month`,
  pricingInfo_fresenius3: `If you are entitled to free or reduced usage of the
  Recover app, feel free to contact our support team so that we can check and
  check and activate your store`,

  pricingInfo_rcvr1: `You can put recover through its paces for 14 days free of charge.`,
  pricingInfo_rcvr2: `After that the membership costs 15€ incl. VAT per month and store.
  The membership can be cancelled at any time to the end of the month`,
  pricingInfo_rcvr3: `If you are entitled to free or reduced usage of the
  Recover app, feel free to contact our support team so that we can check and
  check and activate your store`,
  pricingInfo_rcvr4: `Do you want to pay by invoice? No problem, please contact our support
  our support and we will organize it for you`,

  pricingInfoEmailSubject_rcvr: `I would like to pay for Recover on account`,

  hasSubscriptionNotForFreeCardTitle1: 'Change payment method',
  hasSubscriptionNotForFreeCardTitle2: 'Manage membership',

  hasSubscriptionNotForFreeMessage: `You can change your Membership at any time at the end of the month. `,

  logout: 'Logout',
  /**
   * subscriptions start
   */
  freeSub1: 'you can',
  freeSub2: 'recover for free',
  freeSub3: 'use',

  trialing1: 'You are in the in the trial period of you membership',
  trialing2: 'after that the membership will be renewed automatically',

  trialing_internal1: `you can recover until`,

  trialing_internal2: `try for free`,

  incomplete: `Your payment is being processed...`,

  incomplete_expired1: `Your Payment could not be processed. No payments were initiated.`,

  incomplete_expired2: `Please try again.`,

  unpaid: `Your last invoice has not been paid yet.`,

  cancelled: `Your membership is cancelled.`,
  /**
   * subscriptions end
   */

  checkoutSelectionModalTitle: 'Payment method',
  checkoutSelectionModalSepaButtonText: 'SEPA Direct Debit',
  checkoutSelectionModalStripeButtonText: 'Credit Card',

  ownerModalSubmitButton: 'Save',
}

export default en

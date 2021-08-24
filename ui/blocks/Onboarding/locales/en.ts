import validatorsLocalesEN from '~lib/validators/validatorsLocales.en'
import de from '~ui/blocks/Onboarding/locales/de'

const en: typeof de = {
  ...validatorsLocalesEN,

  residentLabel: 'residentName',
  hadCoronaLabel:
    'recovered: I certify to have documentation of my recovery from a Corona illness and to be able to show it in the test case.',
  vaccinatedLabel:
    'Vaccinated: I confirm to have documentation (vaccination certificate) of my vaccination against corona virus infection and to be able to show this in the test case.',
  rememberMeLabel: 'Save data on my cell phone',

  residentRequired: 'resident name must be provided',
  healthDocRequired: 'You must be either tested, recovered or vaccinated.',

  provideTestLabel1: 'Tested: I confirm a negative, no longer than',
  provideTestLabel2:
    'Hours ago, to have test result available and to be able to present it in the test case',

  abortButtonText: 'Cancel',
  aggreeFineprint:
    'By pressing the button, I agree that my data will be stored for 4 weeks to fulfill the obligation of hygiene and infection control standards',
  submitButtonFallbackText: 'Check in',
}

export default en

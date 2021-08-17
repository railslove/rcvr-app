import de from '~ui/blocks/Onboarding/locales/de'

const en: typeof de = {
  zipInputLabel: 'zip code',
  cityInputLabel: 'City',
  addressInputLabel: 'address (street and house number)',
  residentInputLabel: 'resident name',
  hadCoronaInputLabel:
    'Convalescent: I certify that I have documentation of my recovery from a Corona illness and that I will be able to show this documentation in the test case',
  vaccinatedInputLabel:
    'Vaccinated: I confirm to have documentation (vaccination certificate) of my vaccination against corona virus infection and to be able to show this in the test case',
  rememberMeInputLabel: 'Save data on my cell phone',

  zipRequired: 'Zip code must be provided',
  nameRequired: 'Name must be specified',
  cityRequired: 'City must be specified.',
  addressRequired: 'Address must be specified.',
  residentRequired: 'Resident name must be specified.',
  healthDocRequired: 'You must be either tested, recovered, or vaccinated.',

  provideTestLabel1: 'Tested: I confirm a negative, no longer than',
  provideTestLabel2:
    'Hours ago, to have test result available and to be able to present it in the test case',

  abortButtonText: 'Cancel',
  aggreeFineprint:
    'By pressing the button, I agree that my data will be stored for 4 weeks to fulfill the obligation of hygiene and infection control standards',
  submitButtonFallbackText: 'Check in',
}

export default en

import { isFormal } from '~lib/config'
import verifyKeyManuallyDe from '~pages/business/setup/verify-key-manually.de'

const en: typeof verifyKeyManuallyDe = {
  pageTitle: `Your key`,
  headline: 'Confirm key',

  giveKeyMessage: isFormal
    ? 'Enter the key again now. This will make sure you have written it down correctly.'
    : 'Enter the key again now. This way we make sure that you have noted it correctly.',

  reminderMessage1: `Reminder: Your key is`,
  reminderMessage2Characters: 'Characters',
  reminderMessage3: `long. It contains only numbers of`,
  reminderMessage4Numbers: '0 to 9',
  reminderMessage5: 'and letters from',
  reminderMessage6Characters: 'A to F',

  testKeyButtonText: 'check key',

  reviewKeyReminder: 'You can also go back and see the key again ',

  backLinkText: 'back',

  privateKeyInputLabel: 'Key',
  privateKeyFieldError:
    'The key is not correct. Please check again. Spaces and upper and lower case are not important.',
}

export default en

import { isFormal } from '~lib/config'

const de = {
  pageTitle: `${isFormal ? 'Ihr' : 'Dein'} Schlüssel`,
  headline: 'Schlüssel bestätigen',

  giveKeyMessage: isFormal
    ? 'Geben Sie den Schlüssel nun erneut ein. Damit gehen wir sicher, dass Sie ihn korrekt notiert haben.'
    : 'Gib den Schlüssel nun erneut ein. Damit gehen wir sicher, dass Du ihn korrekt notiert hast.',

  reminderMessage1: `Zur Erinnerung: ${
    isFormal ? 'Ihr' : 'Dein'
  } Schlüssel ist`,
  reminderMessage2Characters: 'Zeichen',
  reminderMessage3: 'lang. Er beinhaltet nur Zahlen von',
  reminderMessage4Numbers: '0 bis 9',
  reminderMessage5: 'und Buchstaben von',
  reminderMessage6Characters: 'A bis F',

  testKeyButtonText: 'Schlüssel prüfen',

  reviewKeyReminder: `${
    isFormal ? 'Sie können' : 'Du kannst'
  } auch nochmal zurück gehen und den Schlüssel erneut sehen.`,

  backLinkText: 'zurück',

  privateKeyFieldError:
    'Der Schlüssel stimmt nicht. Bitte nochmal überprüfen. Leerzeichen und Groß- und Kleinschreibung spielen keine Rolle.',
}

const en: typeof de = {
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

  privateKeyFieldError:
    'The key is not correct. Please check again. Spaces and upper and lower case are not important.',
}

export default { de, en }

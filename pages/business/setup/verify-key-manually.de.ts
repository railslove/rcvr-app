import { isFormal } from '~lib/config'

export default {
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

import { isFormal } from '~lib/config'
import de from './verify-key-manually.de'

const pl: typeof de = {
  pageTitle: 'Twój klucz',
  headline: 'Potwierdź klucz',

  giveKeyMessage: isFormal
    ? 'Teraz wprowadź klucz ponownie. W ten sposób upewnisz się, że zapisałeś to poprawnie'
    : 'Wprowadź teraz ponownie klucz. W ten sposób upewnisz się, że zapisałeś go poprawnie',

  reminderMessage1: `Dla przypomnienia, Twój kluczem jest`,
  reminderMessage2Characters: 'Characters',
  reminderMessage3: 'long. Zawiera tylko liczby',
  reminderMessage4Numbers: '0 to 9',
  reminderMessage5: 'i listy od',
  reminderMessage6Characters: 'A to F',

  testKeyButtonText: 'przegląd klucza',

  reviewKeyReminder: `${
    isFormal ? 'You can' : 'You can'
  } również wrócić i zobaczyć klucz ponownie `,

  backLinkText: 'back',

  privateKeyInputLabel: 'key',
  privateKeyFieldError:
    'Klucz nie jest prawidłowy. Proszę sprawdzić jeszcze raz. Spacje oraz duże i małe litery nie są ważne',
}

export default pl

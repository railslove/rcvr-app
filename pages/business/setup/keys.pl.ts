import { isFormal } from '~lib/config'
import de from './keys.de'

const pl: typeof de = {
  pageTitle: `Twój klucz`,
  title: `Twój tajny klucz`,
  message1: isFormal
    ? 'Bardzo ważne jest, abyś zapisał ten klucz'
    : 'Bardzo ważne jest, abyś zapisał ten klucz',
  message2: isFormal
    ? 'Zapisz klucz np. na kartce papieru i trzymaj ją w bezpiecznym miejscu. Możesz również zrobić zrzut ekranu i zapisać go. Lub zapisz klucz w menedżerze haseł'
    : 'Na przykład, zapisz klucz na kartce papieru i przechowuj go starannie. Albo zrób zrzut ekranu i zapisz go bezpiecznie. Można je również zapisać w menedżerze haseł',
  message3: isFormal
    ? 'Następnym krokiem jest wprowadzenie klucza. W ten sposób upewnisz się, że zapisałeś to poprawnie'
    : 'W następnym kroku należy podać klucz. W ten sposób upewniamy się, że zapisaliście to prawidłowo',
  printKeyButtonText: 'Drukuj klucz',
  verifyKeyButtonText: 'verify key',
}

export default pl

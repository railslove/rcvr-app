import { isFormal } from '~lib/config'

const de = {
  pageTitle: `${isFormal ? 'Ihr' : 'Dein'} Schlüssel | recover`,
  title: `${isFormal ? 'Ihr' : 'Dein'} geheimer Schlüssel`,
  message1: isFormal
    ? 'Es ist sehr wichtig, dass Sie diesen Schlüssel notieren.'
    : 'Es ist sehr wichtig, dass Du diesen Schlüssel notierst.',
  message2: isFormal
    ? 'Notieren Sie sich den Schlüssel zum Beispiel auf einem Zettel und verwahren Sie diesen sorgfältig. Sie können auch einen Screenshot machen und diesen abspeichern. Oder Sie speichern den Schlüssel in einem Passwortmanager.'
    : 'Schreib den Schlüssel zum Beispiel auf einen Zettel und verwahre ihn sorgfältig. Oder mach einen Screenshot davon und speichere ihn sicher. Du kannst ihn auch in einem Passwortmanager speichern.',
  message3: isFormal
    ? 'Im nächsten Schritt müssen Sie den Schlüssel eingeben. Damit gehen wir sicher, dass Sie ihn korrekt notiert haben.'
    : 'Im nächsten Schritt musst Du den Schlüssel eingeben. Damit gehen wir sicher, dass Du ihn korrekt notiert hast.',

  submitButtonText: 'Schlüssel prüfen',
}

const en: typeof de = {
  pageTitle: `Your key | recover`,
  title: `Your secret key`,
  message1: 'It is very important that you write down this key.',
  message2: isFormal
    ? 'For example, write down the key on a piece of paper and keep it carefully. You can also take a screenshot and save it. Or save the key in a password manager.'
    : 'For example, write the key on a piece of paper and store it carefully. Or take a screenshot of it and save it safely. You can also save it in a password manager.',
  message3: isFormal
    ? 'In the next step you need to enter the key. This will make sure that you have written it down correctly.'
    : 'In the next step you have to enter the key. With this we make sure that you have noted it correctly',

  submitButtonText: 'Check key',
}

export default { de, en }

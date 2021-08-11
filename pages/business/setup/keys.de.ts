import { isFormal } from '~lib/config'

export default {
  pageTitle: `${isFormal ? 'Ihr' : 'Dein'} Schlüssel`,
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

import { isFormal } from '~lib/config'

export default {
  pageTitle: 'Mein Profil',
  editProfile: 'Profil bearbeiten',
  myMembership: 'Meine Mitgliedschaft',
  hasNoCompaniesMessage: `${
    isFormal ? 'Sie müssen' : 'Du musst'
  } zuerst einen Betrieb anlegen.`,
  writeEmailMessage:
    'Wenn sie recover weiter nutzen möchten, schreiben sie uns eine E-Mail.',
  writeEmailButtonText: 'Email schreiben',
  upgradeNow: 'Jetzt upgraden',
}

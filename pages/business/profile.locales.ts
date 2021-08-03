import { isFormal } from '~lib/config'

const de = {
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

const en: typeof de = {
  pageTitle: 'My Profile',
  editProfile: 'Edit Profile',
  myMembership: 'My membership',
  hasNoCompaniesMessage: `You must create a company first `,
  writeEmailMessage: 'If you want to continue using recover, please email us.',
  writeEmailButtonText: 'Write an email',
  upgradeNow: 'upgrade now',
}

export default { de, en }

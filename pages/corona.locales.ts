import { isFormal } from '~lib/config'

const de = {
  title: 'Was soll ich tun, wenn ich Kontaktperson bin?',
  pageTitle: 'Corona, was nun?',
  description1: 'In erster Linie: ruhig bleiben.',
  description2: [
    `Wenn ${isFormal ? 'Sie' : 'du'} eine bestätigte Kontaktperson`,
    `${isFormal ? 'sind' : 'bist'}, wird sich das Gesundheitsamt bei`,
    `${isFormal ? 'Ihnen' : 'dir'} telefonisch innerhalb von 48 Stunden`,
    'melden',
  ].join(' '),
  description3: [
    `Falls ${isFormal ? 'Sie' : 'du'} bereits typische Symptome wie Fieber,`,
    `${isFormal ? 'haben, sollten Sie' : 'hast, solltest du'}`,
    `vorsichtshalber in häuslicher Quarantäne bleiben und das`,
    'Gesundheitsamt informieren.',
  ].join(' '),

  hotlineTitle: 'Hotline zum Coronavirus',

  coronaHotlinePhoneText: '030 346465100',
  coronaHotlinePhoneValue: '+4930346465100',

  moreQuestionsTitle: 'Noch Fragen?',
  moreQuestionsText1:
    'Eine Vielzahl von ständig aktualisierten Informationen gibt es auf der Internetseite des Bundesgesundheitsministeriums:',

  moreQuestionsLinkText: 'www.bundesgesundheitsministerium.de/coronavirus',
  moreQuestionsLinkValue:
    'https://www.bundesgesundheitsministerium.de/coronavirus.html',

  moreQuestionsText2:
    'Dort finden sich insbesondere auch Links zu den Informationsangeboten der Bundeszentrale für gesundheitliche Aufklärung und des Robert Koch-Instituts.',
}

const en: typeof de = {
  ...de,

  title: 'What should I do if I am a contact?',
  pageTitle: 'Corona, what now?',
  description1: 'First and foremost: stay calm',
  description2: `If you are a confirmed contact the health department will contact you by telephone within 48 hours`,
  description3: [
    `If you already have typical symptoms such as fever,`,
    `you should, as a precaution, stay in domestic quarantine and inform the health department.`,
  ].join(' '),

  hotlineTitle: 'Corona virus hotline',

  moreQuestionsTitle: 'Any questions?',
  moreQuestionsText1:
    'A variety of constantly updated information is available on the website of the Federal Ministry of Health:',

  moreQuestionsText2:
    'There you will also find, in particular, links to the information provided by the Federal Center for Health Education and the Robert Koch Institute.',
}

export default { en, de }

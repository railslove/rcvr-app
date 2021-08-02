import { isFormal } from '~lib/config'

export default {
  title: 'Was soll ich tun, wenn ich Kontaktperson bin?',
  pageTitle: 'Corona, was nun?',
  description: [
    'In erster Linie: ruhig bleiben.',
    [
      `Wenn ${isFormal ? 'Sie' : 'du'} eine bestätigte Kontaktperson`,
      `${isFormal ? 'sind' : 'bist'}, wird sich das Gesundheitsamt bei`,
      `${isFormal ? 'Ihnen' : 'dir'} telefonisch innerhalb von 48 Stunden`,
      'melden',
    ].join(' '),
    [
      `Falls ${isFormal ? 'Sie' : 'du'} bereits typische Symptome wie Fieber,`,
      `${isFormal ? 'haben, sollten Sie' : 'hast, solltest du'}`,
      `vorsichtshalber in häuslicher Quarantäne bleiben und das`,
      'Gesundheitsamt informieren.',
    ].join(' '),
  ],

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

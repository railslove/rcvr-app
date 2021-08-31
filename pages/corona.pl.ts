import { isFormal } from '~lib/config'
import de from './corona.de'

const pl: typeof de = {
  title: 'Co powinienem zrobić, jeśli jestem w kontakcie?',
  pageTitle: 'Corona, co teraz?',
  description1: 'Po pierwsze i najważniejsze: zachowaj spokój',
  description2: [
    `If ${isFormal ? 'ty' : 'ty'} potwierdzony kontakt`,
    `${isFormal ? 'are' : 'are'}, departament zdrowia skontaktuje się z`,
    `${isFormal ? 'you' : 'you'} telefonicznie w ciągu 48 godzin`,
    'raport',
  ].join(' '),
  description3: [
    `If ${
      isFormal ? 'you' : 'you'
    } mają już typowe objawy, takie jak gorączka,`,
    `${isFormal ? 'mieć, powinieneś' : 'mieć, powinieneś'}`,
    `Jako środek ostrożności, pozostańcie w domowej kwarantannie i poinformujcie..`,
    'poinformuj departament zdrowia',
  ].join(' '),

  hotlineTitle: 'Gorąca linia dotycząca wirusa Corona',

  coronaHotlinePhoneText: '030 346465100',
  coronaHotlinePhoneValue: '+4930346465100',

  moreQuestionsTitle: 'Any questions?',
  moreQuestionsText1:
    'Na stronie internetowej Federalnego Ministerstwa Zdrowia dostępny jest szeroki zakres stale aktualizowanych informacji:',

  moreQuestionsLinkText: 'www.bundesgesundheitsministerium.de/coronavirus',
  moreQuestionsLinkValue:
    'https://www.bundesgesundheitsministerium.de/coronavirus.html',

  moreQuestionsText2:
    'Ponadto znajdą tam Państwo w szczególności linki do serwisów informacyjnych Federalnej Centrali Oświaty Zdrowotnej oraz Instytutu Roberta Kocha.',
}

export default pl

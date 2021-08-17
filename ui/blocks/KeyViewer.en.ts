import { isFormal } from '~lib/config'
import keyViewerDe from '~ui/blocks/KeyViewer.de'

const en: typeof keyViewerDe = {
  yourKeyIs: `${isFormal ? 'your' : 'your'} key is`,
  characters: 'characters',
  long: 'long',

  itCointains: 'It only contains numbers from',
  '0to9': '0 to 9',
  andLettersFrom: 'and letters from',
  AtoF: 'A to F',
}

export default en

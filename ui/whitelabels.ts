import LogoRcvr from './svg/logo-rcvr.svg'
import LogoCare from './svg/logo-care.svg'
import LogoFresenius from './svg/logo-fresenius.svg'

const envs = {
  rcvr: {
    backgroundColor: '',
    highlightColor: '',
    Logo: LogoRcvr,
    logoSmallWidth: '61px',
    logoSmallHeight: '10px',
    logoBigWidth: '182px',
    logoBigHeight: '20px',
    introText:
      'Durch die aktuellen Corona-Verordnungen musst du deine Kontaktdaten hinterlegen, wenn Du in einem Betrieb bist der zu Schutzmaßnahmen verpflichtet ist, wie z.B Restaurants. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
  },
  care: {
    backgroundColor: '#f2f2f2',
    highLightColor: '##F5B743',
    Logo: LogoCare,
    logoSmallWidth: '92px',
    logoSmallHeight: '10px',
    logoBigWidth: '120px',
    logoBigHeight: '20px',
    introText:
      'Durch die aktuellen Corona-Verordnungen müssen Sie Ihre Kontaktdaten hinterlegen, wenn Sie in einem Betrieb sind der zu Schutzmaßnahmen verpflichtet ist, wie z.B Pflegeeinrichtungen. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
  },
  fresenius: {
    backgroundColor: '#A6D7D7',
    highlightColor: '#009EE0',
    Logo: LogoFresenius,
    logoSmallWidth: '150px',
    logoSmallHeight: '66px',
    logoBigWidth: '300px',
    logoBigHeight: '130px',
    introText:
      'Bitte geben Sie Ihre Kontaktdaten ein, wenn Sie sich in diesem Raum aufhalten. Dies ist Teil der verpflichtenden Hygiene- und Schutzmaßnahmen am Campus und dient der Nachverfolgung in einem Infektionsfall.',
  },
}

const {
  introText,
  backgroundColor,
  highlightColor,
  Logo,
  logoBigWidth,
  logoBigHeight,
  logoSmallWidth,
  logoSmallHeight,
} = envs[process.env.NEXT_PUBLIC_BUILD_VARIANT || 'rcvr']

export {
  introText,
  Logo,
  backgroundColor,
  highlightColor,
  logoBigWidth,
  logoBigHeight,
  logoSmallWidth,
  logoSmallHeight,
  LogoCare,
  LogoRcvr,
  LogoFresenius,
}

import LogoRcvr from './svg/logo-rcvr.svg'
import LogoCare from './svg/logo-care.svg'
import LogoFresenius from './svg/logo-fresenius.svg'
import LogoHealth from './svg/logo-health.svg'

const envs = {
  rcvr: {
    backgroundColor: 'bluegrey.50',
    primaryHighlightColor: '#28EE5F',
    secondaryHighlightColor: '#EA28EE',
    Logo: LogoRcvr,
    logoSmallWidth: '61px',
    logoSmallHeight: '10px',
    logoBigWidth: '182px',
    logoBigHeight: '20px',
    privacyUrl: '',
    formalAddress: false,
    introText:
      'Durch die aktuellen Corona-Verordnungen musst du deine Kontaktdaten hinterlegen, wenn Du in einem Betrieb bist der zu Schutzmaßnahmen verpflichtet ist, wie z.B Restaurants. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
  },
  care: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#F5B743',
    secondaryHighlightColor: '',
    Logo: LogoCare,
    logoSmallWidth: '92px',
    logoSmallHeight: '10px',
    logoBigWidth: '120px',
    logoBigHeight: '20px',
    privacyUrl: '',
    formalAddress: true,
    introText:
      'Durch die aktuellen Corona-Verordnungen müssen Sie Ihre Kontaktdaten hinterlegen, wenn Sie in einem Betrieb sind der zu Schutzmaßnahmen verpflichtet ist, wie z.B Pflegeeinrichtungen. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
  },
  fresenius: {
    backgroundColor: '#A6D7D7',
    primaryHighlightColor: '#009EE0',
    secondaryHighlightColor: '',
    Logo: LogoFresenius,
    logoSmallWidth: '150px',
    logoSmallHeight: '66px',
    logoBigWidth: '300px',
    logoBigHeight: '130px',
    privacyUrl:
      'https://www.hs-fresenius.de/datenschutzerklaerung-recover-app/',
    formalAddress: true,
    introText:
      'Bitte geben Sie Ihre Kontaktdaten ein, wenn Sie sich in diesem Raum aufhalten. Dies ist Teil der verpflichtenden Hygiene- und Schutzmaßnahmen am Campus und dient der Nachverfolgung in einem Infektionsfall.',
  },
  health: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#10D4FF',
    secondaryHighlightColor: '',
    Logo: LogoHealth,
    logoSmallWidth: '184px',
    logoSmallHeight: '20px',
    logoBigWidth: '240px',
    logoBigHeight: '40px',
    privacyUrl: '',
    formalAddress: true,
    introText:
      'Durch die aktuellen Corona-Verordnungen müssen Sie Ihre Kontaktdaten hinterlegen, wenn Sie in einem Betrieb sind der zu Schutzmaßnahmen verpflichtet ist, wie z.B Krankenhäuser. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
  },
}

const {
  introText,
  formalAddress,
  privacyUrl,
  backgroundColor,
  primaryHighlightColor,
  secondaryHighlightColor,
  Logo,
  logoBigWidth,
  logoBigHeight,
  logoSmallWidth,
  logoSmallHeight,
} = envs[process.env.NEXT_PUBLIC_BUILD_VARIANT || 'rcvr']

export {
  introText,
  formalAddress,
  privacyUrl,
  Logo,
  backgroundColor,
  primaryHighlightColor,
  secondaryHighlightColor,
  logoBigWidth,
  logoBigHeight,
  logoSmallWidth,
  logoSmallHeight,
}

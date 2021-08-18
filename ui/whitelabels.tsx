import * as React from 'react'
import { Box } from '~ui/core'
import LogoCare from './svg/logo-care.svg'
import LogoFresenius from './svg/logo-fresenius.svg'
import LogoHealth from './svg/logo-health.svg'
import LogoRcvr from './svg/logo-rcvr.svg'

const envs = {
  rcvr: {
    backgroundColor: 'bluegrey.50',
    primaryHighlightColor: '#28EE5F',
    secondaryHighlightColor: '#EA28EE',
    Logo: LogoRcvr,
    logoSmallWidth: '122px',
    logoSmallHeight: '35px',
    logoBigWidth: '182px',
    logoBigHeight: '40px',
    privacyUrl: 'https://railslove.com/privacy/',
    formalAddress: false,
    introText:
      'Durch die aktuellen Corona-Verordnungen musst du Deine Kontaktdaten hinterlegen, wenn Du in einem Betrieb bist der zu Schutzmaßnahmen verpflichtet ist, wie z.B. Restaurants. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
    title: 'Für Betriebe | recover',
    pageTitle: 'recover',
    indexIntro:
      'recover ist die digitale Kontaktdatenliste für Betriebe und deren Gäste. Einfach, sicher, schnell.',
    verifyPrivateKeyExplanation: (
      <>
        <p>
          <strong>
            Du wirst die Datei rcvr_geheimer_schluessel.txt wieder brauchen,
            wenn das Gesundheitsamt anruft.
          </strong>
        </p>
        <p>
          Zur Bestätigung, dass du den Schlüssel erhalten hast, lade den
          Schlüssel hier nochmal hoch.
        </p>
      </>
    ),
    pdfType: 'Zusatz-Informationen',
    pricingInfoDuringTest: (
      <p>
        Du kannst recover 14 Tage lang kostenlos auf Herz und Nieren testen.
        <br />
        <br />
        Danach kostet die Mitgliedschaft 15€ inkl. USt. pro Monat und Betrieb.
        Die Mitgliedschaft kann jederzeit zum Monatsende gekündigt werden.
        <br />
        <br />
        Wenn Du Anspruch auf eine kostenlose oder reduzierte Nutzung von der
        Recover App hast, melde Dich gerne bei unserem Support, damit wir Deinen
        Laden überprüfen und freischalten können:{' '}
        <a href="mailto:team@recoverapp.de">team@recoverapp.de</a>
        <br />
        <br />
        Willst Du per Rechnung bezahlen? Kein Problem, melde Dich gerne bei
        unserem Support und wir organiseren das für Dich:{' '}
        <a href="mailto:team@recoverapp.de?subject=Ich würde gerne für Recover auf Rechnung bezahlen">
          team@recoverapp.de
        </a>
      </p>
    ),
  },
  care: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#F5B743',
    secondaryHighlightColor: '',
    Logo: LogoCare,
    logoSmallWidth: '184px',
    logoSmallHeight: '35px',
    logoBigWidth: '240px',
    logoBigHeight: '40px',
    privacyUrl: 'https://www.recovercare.de/datenschutzerklarung',
    formalAddress: true,
    indexIntro:
      'recover ist die digitale Kontaktdatenliste für Pflegeeinrichtungen, deren Besucher und Gäste. Einfach, sicher, schnell.',
    introText:
      'Durch die aktuellen Corona-Verordnungen müssen Sie Ihre Kontaktdaten hinterlegen, wenn Sie in einem Betrieb sind der zu Schutzmaßnahmen verpflichtet ist, wie z.B Pflegeeinrichtungen. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
    title: 'Für Pflegeeinrichtungen | recover',
    pageTitle: 'recover care',
    verifyPrivateKeyExplanation: (
      <>
        <p>
          <strong>
            Zur Bestätigung laden Sie die Schlüsseldatei
            rcvr_geheimer_schluessel.txt bitte hier hoch.
          </strong>
        </p>
        <Box height={4} />
      </>
    ),
    pdfType: 'Hygienevorschriften',
    pricingInfoDuringTest: (
      <p>
        Sie können recover 14 Tage lang kostenlos auf Herz und Nieren testen.
        Danach kostet die Mitgliedschaft 29.90€ inkl. USt. pro Monat und
        Pflegeeinrichtung. Die Mitgliedschaft kann jederzeit zum Monatsende
        gekündigt werden.
      </p>
    ),
  },
  health: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#28EE5F',
    secondaryHighlightColor: '#10D4FF',
    Logo: LogoHealth,
    logoSmallWidth: '184px',
    logoSmallHeight: '35px',
    logoBigWidth: '240px',
    logoBigHeight: '40px',
    privacyUrl: 'https://www.recover-health.de/datenschutzerklarung',
    formalAddress: true,
    indexIntro:
      'recover ist die digitale Kontaktdatenliste für Krankenhäuser, deren Besucher und Gäste. Einfach, sicher, schnell.',
    introText:
      'Durch die aktuellen Corona-Verordnungen müssen Sie Ihre Kontaktdaten hinterlegen, wenn Sie in einem Betrieb sind der zu Schutzmaßnahmen verpflichtet ist, wie z.B Krankenhäuser. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
    title: 'Für Krankenhäuser | recover',
    pageTitle: 'recover health',
    verifyPrivateKeyExplanation: (
      <>
        <p>
          <strong>
            Zur Bestätigung laden Sie die Schlüsseldatei
            rcvr_geheimer_schluessel.txt bitte hier hoch.
          </strong>
        </p>
        <Box height={4} />
      </>
    ),
    pdfType: 'Hygienevorschriften',
    pricingInfoDuringTest: (
      <>
        <p>
          Sie können recover 14 Tage lang kostenlos testen. Danach kostet die
          Mitgliedschaft für alle Krankenhäuser mit einer Größe bis 199 Betten
          199€ pro Monat, für alle Krankenhäuser mit einer Größe von 200 bis 499
          Betten 349€ pro Monat und für alle Krankenhäuser mit einer Größe von
          500 Betten 449€ pro Monat bei einer jeweiligen Mindestlaufzeit von 6
          Monaten.
        </p>
        <p>
          Bei Fragen zum Pricing können Sie sich jederzeit bei unserem Support
          unter team@recoverapp.de melden.
        </p>
      </>
    ),
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
    title: 'Für Betriebe | recover',
    pageTitle: 'recover',
    instruction: 'So nutzt Du recover für Deinen Betrieb',
    signupText: '',
    verifyPrivateKeyExplanation: (
      <>
        <p>
          <strong>
            Du wirst die Datei rcvr_geheimer_schluessel.txt wieder brauchen,
            wenn das Gesundheitsamt anruft.
          </strong>
        </p>
        <p>
          Lade die Schlüsseldatei deshalb hier zur Bestätigung noch einmal hoch.
        </p>
      </>
    ),
    pricingInfoDuringTest: (
      <p>
        Du kannst recover 14 Tage lang kostenlos auf Herz und Nieren testen.
        <br />
        Danach kostet die Mitgliedschaft 15€ inkl. USt. pro Monat und Betrieb.
        Die Mitgliedschaft kann jederzeit zum Monatsende gekündigt werden.
        <br />
        Wenn Du Anspruch auf eine kostenlose oder reduzierte Nutzung von der
        Recover App hast, melde Dich gerne bei unserem Support, damit wir Deinen
        Laden überprüfen und freischalten können:{' '}
        <a href="mailto:team@recoverapp.de">team@recoverapp.de</a>
      </p>
    ),
  },
}

export type WhiteLabelBuildVariant = keyof typeof envs

export const BUILD_VARIANT: WhiteLabelBuildVariant =
  (process.env.NEXT_PUBLIC_BUILD_VARIANT as WhiteLabelBuildVariant) || 'rcvr'

const {
  pdfType,
  indexIntro,
  title,
  pageTitle,
  instruction,
  signupText,
  verifyPrivateKeyExplanation,
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
  pricingInfoDuringTest,
} = envs[process.env.NEXT_PUBLIC_BUILD_VARIANT || 'rcvr']

export {
  pdfType,
  indexIntro,
  title,
  pageTitle,
  instruction,
  signupText,
  verifyPrivateKeyExplanation,
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
  pricingInfoDuringTest,
}

import { Box } from '~ui/core'
import { Warning } from './svg'
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
    title: 'Für Betriebe | recover',
    pageTitle: 'recover',
    instruction: 'Account erstellen',
    setupIntro: (
      <>
        <p>
          Seit Corona sind viele Betriebe und Einrichtungen verpflichtet,
          Kontaktdaten zu erfassen. Erspar Dir die Zettelwirtschaft! Mit recover
          führst Du diese Liste digital. Um die Daten deiner Gäste zu schützen,
          werden sie von der App verschlüsselt. Während des Onboardings
          erstellst Du daher in wenigen Schritten ein digitales Schlüsselpaar.
        </p>
        <p>
          Nach dem Onboarding kannst Du Dich bei uns melden um zusammen mit
          unserem Team die Echtheit deiner Daten zu prüfen
        </p>
        <p>
          Die Einrichtung von recover dauert ca. 10 Min. Bist Du bereit? Dann
          lass uns starten.
        </p>
      </>
    ),
    signupText:
      'Mit deinem Account kannst du QR Codes erstellen und Checkins deiner Gäste verwalten.',
    privateKeyExplanation: (
      <>
        <p>
          Wir freuen uns, dass du recover nutzt!
          <span role="img" aria-label="Hurra!">
            🎉
          </span>
        </p>
        <p>
          Um die Echtheit deiner Daten zu überprüfen, werden wir uns bald per
          E-Mail bei dir melden.
        </p>
        <p>
          <strong>Nächster Schritt: </strong>
          <br />
          Ein Schlüssel wird erzeugt mit dem die Daten deiner Kunden
          verschlüsselt werden.
          <br />
          Bitte wähle hier aus, wie du den Schlüssel verwahren möchtest.
        </p>
        <Box height={4} />
        <div>
          <Warning />
        </div>
        <Box height={4} />
        <p>
          <strong>
            Ohne Schlüssel kannst du keine Daten an das Gesundheitsamt senden.
          </strong>
        </p>
      </>
    ),
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
    finishedText: (
      <>
        <p>
          Wir freuen uns, dass Du dabei bist! Dein Account ist jetzt vollständig
          eingerichtet.
        </p>
        <p>
          Du kannst Dich gern bei uns melden, um gemeinsam Deine Daten zu
          prüfen.
        </p>
        <p>Jetzt kannst Du Betriebe, Bereiche und QR-Codes erstellen.</p>
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
    title: 'Für Pflegeeinrichtungen | recover',
    pageTitle: 'recover care',
    instruction: 'Account erstellen',
    setupIntro: (
      <>
        <p>
          Mit recover führen Sie die Kontaktdatenliste Ihrer Besucher digital.
          Um die Daten zu schützen, werden diese von der App verschlüsselt.
        </p>
        <p>Die Einrichtung von recover dauert ca. 10 Min.</p>
      </>
    ),
    signupText: '',
    privateKeyExplanation: (
      <>
        <p>
          <strong>Nächster Schritt: </strong>
          <br />
          Ein Schlüssel wird erzeugt mit dem die Daten verschlüsselt werden.
          <br />
          Bitte wählen Sie hier aus, wie Sie den Schlüssel verwahren möchten.
        </p>
        <Box height={4} />
        <div>
          <Warning />
        </div>
        <Box height={4} />
        <p>
          <strong>
            Ohne Schlüssel können Sie keine Daten an das Gesundheitsamt senden.
          </strong>
        </p>
      </>
    ),
    contactInformation: (
      <>
        <p>
          Falls Sie Fragen zu Ihrem Account und zur Schlüsseldatei haben, melden
          Sie sich gern bei uns:{'  '}
          <a href="tel:022197356159">
            BFS Service GmbH 0221/97356-159 oder 0221/97356-160
          </a>
        </p>
      </>
    ),
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
    finishedText: (
      <>
        <p>
          Wir freuen uns, dass Sie dabei sind! Ihr Account ist jetzt vollständig
          eingerichtet.
        </p>
        <p>
          Falls Sie Fragen zu Ihrem Account und zur Schlüsseldatei haben, melden
          Sie sich gern bei uns:{'  '}
          <a href="tel:022197356159">
            BFS Service GmbH 0221/97356-159 oder 0221/97356-160
          </a>
        </p>
        <p>
          Jetzt können Sie Ihre Betriebe, Häuser und Bereiche anlegen, sowie
          QR-Codes für die Besucher erstellen.
        </p>
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
    title: 'Für Krankenhäuser | recover',
    pageTitle: 'recover health',
    instruction: 'Account erstellen',
    setupIntro: (
      <>
        <p>
          Mit recover führen Sie die Kontaktdatenliste Ihrer Besucher digital.
          Um die Daten zu schützen, werden diese von der App verschlüsselt.
        </p>
        <p>Die Einrichtung von recover dauert ca. 10 Min.</p>
      </>
    ),
    signupText: '',
    privateKeyExplanation: (
      <>
        <p>
          <strong>Nächster Schritt: </strong>
          <br />
          Ein Schlüssel wird erzeugt mit dem die Daten verschlüsselt werden.
          <br />
          Bitte wählen Sie hier aus, wie Sie den Schlüssel verwahren möchten.
        </p>
        <Box height={4} />
        <div>
          <Warning />
        </div>
        <Box height={4} />
        <p>
          <strong>
            Ohne Schlüssel können Sie keine Daten an das Gesundheitsamt senden.
          </strong>
        </p>
      </>
    ),
    contactInformation: (
      <>
        <p>
          Falls Sie Fragen zu Ihrem Account und zur Schlüsseldatei haben, melden
          Sie sich gern bei uns:{'  '}
          <a href="tel:022197356159">
            BFS Service GmbH 0221/97356-159 oder 0221/97356-160
          </a>
        </p>
      </>
    ),
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
    finishedText: (
      <>
        <p>Ihr Account ist jetzt vollständig eingerichtet.</p>
        <p>
          Falls Sie Fragen zu Ihrem Account und zum Entschlüsseln der Daten
          haben, melden Sie sich gern bei uns:{'  '}
          <a href="tel:022197356159">
            BFS Service GmbH 0221/97356-159 oder 0221/97356-160
          </a>
        </p>
        <p>
          Jetzt können Sie Ihre Betriebe, Häuser und Bereiche anlegen, sowie
          QR-Codes für die Besucher erstellen.
        </p>
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
    title: 'Für Betriebe | recover',
    pageTitle: 'recover',
    instruction: 'So nutzt Du recover für Deinen Betrieb',
    setupIntro: (
      <>
        <p>
          Seit Corona sind viele Betriebe und Einrichtungen verpflichtet,
          Kontaktdaten zu erfassen. Erspar Dir die Zettelwirtschaft! Mit recover
          führst Du diese Liste digital. Um die Daten deiner Gäste zu schützen,
          werden sie von der App verschlüsselt. Während des Onboardings
          erstellst Du daher in wenigen Schritten ein digitales Schlüsselpaar.
        </p>
        <p>
          Nach dem Onboarding kannst Du Dich bei uns melden um zusammen mit
          unserem Team die Echtheit deiner Daten zu prüfen
        </p>
        <p>
          Die Einrichtung von recover dauert ca. 10 Min. Bist Du bereit? Dann
          lass uns starten.
        </p>
      </>
    ),
    signupText: '',
    privateKeyExplanation: (
      <>
        <p>
          Wir freuen uns, dass du recover nutzt!
          <span role="img" aria-label="Hurra!">
            🎉
          </span>
        </p>
        <p>
          Um die Echtheit deiner Daten zu überprüfen, werden wir uns bald per
          E-Mail bei dir melden.
        </p>
        <p>
          <strong>Nächster Schritt: </strong>
          <br />
          Bitte klicke auf &quot;Schlüssel herunterladen&quot;. Das erzeugt eine
          Schlüsseldatei und startet den Download.
        </p>
        <p>
          <strong>Bitte speichere die Datei auf deinem Rechner ab.</strong>
        </p>
        <p>
          <strong>
            Ohne Schlüssel kannst du keine Daten an das Gesundheitsamt senden.
          </strong>
        </p>
      </>
    ),
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
    finishedText: (
      <>
        <p>
          Wir freuen uns, dass Du dabei bist! Dein Account ist jetzt vollständig
          eingerichtet.
        </p>
        <p>
          Du kannst Dich gern bei uns melden, um gemeinsam Deine Daten zu
          prüfen.
        </p>
        <p>Jetzt kannst Du Betriebe, Bereiche und QR-Codes erstellen.</p>
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

const {
  pdfType,
  contactInformation,
  indexIntro,
  title,
  pageTitle,
  instruction,
  setupIntro,
  signupText,
  privateKeyExplanation,
  verifyPrivateKeyExplanation,
  finishedText,
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
  contactInformation,
  indexIntro,
  title,
  pageTitle,
  instruction,
  setupIntro,
  signupText,
  privateKeyExplanation,
  verifyPrivateKeyExplanation,
  finishedText,
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

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
    logoSmallWidth: '122px',
    logoSmallHeight: '20px',
    logoBigWidth: '182px',
    logoBigHeight: '40px',
    privacyUrl: '',
    formalAddress: false,
    introText:
      'Durch die aktuellen Corona-Verordnungen musst du deine Kontaktdaten hinterlegen, wenn Du in einem Betrieb bist der zu Schutzmaßnahmen verpflichtet ist, wie z.B Restaurants. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
    title: 'Für Betriebe | recover',
    instruction: 'So nutzt Du recover für deinen Betrieb',
    setupIntro: (
      <>
        <p>
          Die aktuelle Corona-Verordnung in NRW schreibt vor, dass Du eine Liste
          der Kontaktdaten deiner Gäste führst. Mit recover führst Du diese
          Liste digital. Um die Daten deiner Gäste zu schützen, werden sie von
          der App verschlüsselt. Während des Onboardings erstellst Du daher in
          wenigen Schritten ein digitales Schlüsselpaar.'
        </p>
        <p>
          Nach dem Onboarding kannst Du dich bei uns melden um zusammen mit
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
          Bitte klicke auf "Schlüssel herunterladen". Das erzeugt eine
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
          Du kannst dich gern bei uns melden, um gemeinsam deine Daten zu
          prüfen.
        </p>
        <p>Jetzt kannst du Betriebe, Tische und QR-Codes erstellen.</p>
      </>
    ),
  },
  care: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#F5B743',
    secondaryHighlightColor: '',
    Logo: LogoCare,
    logoSmallWidth: '184px',
    logoSmallHeight: '20px',
    logoBigWidth: '240px',
    logoBigHeight: '40px',
    privacyUrl: '',
    formalAddress: true,
    introText:
      'Durch die aktuellen Corona-Verordnungen müssen Sie Ihre Kontaktdaten hinterlegen, wenn Sie in einem Betrieb sind der zu Schutzmaßnahmen verpflichtet ist, wie z.B Pflegeeinrichtungen. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
    title: 'Für Pflegeeinrichtungen | recover',
    instruction: 'So nutzen Sie recover für Ihre Pflegeeinrichtung',
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
          Wir freuen uns, dass Sie recover nutzen! '
          <span role="img" aria-label="Hurra!">
            🎉
          </span>
        </p>
        <p>
          Um die Echtheit Ihrer Daten zu überprüfen, werden wir uns zeitnah per
          E-Mail melden.
        </p>
        <p>
          <strong>Nächster Schritt: </strong>
          <br />
          Bitte drücken Sie auf "Schlüssel herunterladen". Das erzeugt eine
          Schlüsseldatei und startet den Download.
        </p>
        <p>
          <strong>Bitte speichern Sie die Datei auf Ihrem Rechner ab.</strong>
        </p>
        <p>
          <strong>
            Ohne Schlüssel können Sie keine Daten an das Gesundheitsamt senden.
          </strong>
        </p>
      </>
    ),
    verifyPrivateKeyExplanation: (
      <>
        <p>
          <strong>
            Sie werden die Datei rcvr_geheimer_schluessel.txt wieder benötigen,
            wenn sich das Gesundheitsamt bei Ihnen meldet.
          </strong>
        </p>
        <p>
          Laden Sie die Schlüsseldatei deshalb hier zur Bestätigung noch einmal
          hoch.
        </p>
      </>
    ),
    finishedText: (
      <>
        <p>
          Wir freuen uns, dass Sie dabei sind! Ihr Account ist jetzt vollständig
          eingerichtet.
        </p>
        <p>
          Falls Sie Fragen zu Ihrem Account und zum Entschlüsseln der Daten
          haben, melden Sie sich gern bei uns.
        </p>
        <p>
          Jetzt können Sie Ihre Betriebe, Häuser und Bereiche anlegen, sowie
          QR-Codes für die Gäste erstellen.
        </p>
      </>
    ),
  },
  health: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#28EE5F',
    secondaryHighlightColor: '#10D4FF',
    Logo: LogoHealth,
    logoSmallWidth: '184px',
    logoSmallHeight: '20px',
    logoBigWidth: '240px',
    logoBigHeight: '40px',
    privacyUrl: '',
    formalAddress: true,
    introText:
      'Durch die aktuellen Corona-Verordnungen müssen Sie Ihre Kontaktdaten hinterlegen, wenn Sie in einem Betrieb sind der zu Schutzmaßnahmen verpflichtet ist, wie z.B Krankenhäuser. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',
    title: 'Für Krankenhäuser | recover',
    instruction: 'So nutzen Sie recover für Ihr Krankenhaus',
    setupIntro: (
      <>
        <p>
          Mit recover führen sie die Kontaktdatenliste Ihrer Besucher digital.
          Um die Daten zu schützen, werden diese von der App verschlüsselt.
        </p>
        <p>Die Einrichtung von recover dauert ca. 10 Min.</p>
      </>
    ),
    signupText: '',
    privateKeyExplanation: (
      <>
        <p>
          Wir freuen uns, dass Sie recover nutzen! '
          <span role="img" aria-label="Hurra!">
            🎉
          </span>
        </p>
        <p>
          Um die Echtheit Ihrer Daten zu überprüfen, werden wir uns zeitnah per
          E-Mail melden.
        </p>
        <p>
          <strong>Nächster Schritt: </strong>
          <br />
          Bitte drücken Sie auf "Schlüssel herunterladen". Das erzeugt eine
          Schlüsseldatei und startet den Download.
        </p>
        <p>
          <strong>Bitte speichern Sie die Datei auf Ihrem Rechner ab.</strong>
        </p>
        <p>
          <strong>
            Ohne Schlüssel können Sie keine Daten an das Gesundheitsamt senden.
          </strong>
        </p>
      </>
    ),
    verifyPrivateKeyExplanation: (
      <>
        <p>
          <strong>
            Sie werden die Datei rcvr_geheimer_schluessel.txt wieder benötigen,
            wenn sich das Gesundheitsamt bei Ihnen meldet.
          </strong>
        </p>
        <p>
          Laden Sie die Schlüsseldatei deshalb hier zur Bestätigung noch einmal
          hoch.
        </p>
      </>
    ),
    finishedText: (
      <>
        <p>
          Wir freuen uns, dass Sie dabei sind! Ihr Account ist jetzt vollständig
          eingerichtet.
        </p>
        <p>
          Falls Sie Fragen zu Ihrem Account und zum Entschlüsseln der Daten
          haben, melden Sie sich gern bei uns.
        </p>
        <p>
          Jetzt können Sie Ihre Betriebe, Häuser und Bereiche anlegen, sowie
          QR-Codes für die Gäste erstellen.
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
    instruction: 'So nutzt Du recover für deinen Betrieb',
    setupIntro: (
      <>
        <p>
          Die aktuelle Corona-Verordnung in NRW schreibt vor, dass Du eine Liste
          der Kontaktdaten deiner Gäste führst. Mit recover führst Du diese
          Liste digital. Um die Daten deiner Gäste zu schützen, werden sie von
          der App verschlüsselt. Während des Onboardings erstellst Du daher in
          wenigen Schritten ein digitales Schlüsselpaar.'
        </p>
        <p>
          Nach dem Onboarding kannst Du dich bei uns melden um zusammen mit
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
          Bitte klicke auf "Schlüssel herunterladen". Das erzeugt eine
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
          Du kannst dich gern bei uns melden, um gemeinsam deine Daten zu
          prüfen.
        </p>
        <p>Jetzt kannst du Betriebe, Tische und QR-Codes erstellen.</p>
      </>
    ),
  },
}

const {
  title,
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
} = envs[process.env.NEXT_PUBLIC_BUILD_VARIANT || 'rcvr']

export {
  title,
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
}

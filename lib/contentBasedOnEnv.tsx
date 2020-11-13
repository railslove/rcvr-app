import { isCareEnv, isFormal, isHealthEnv } from './config'

const getTitle = () => {
  if (isCareEnv) {
    return 'Für Pflegeeinrichtungen | recover'
  } else if (isHealthEnv) {
    return 'Für Krankenhäuser | recover'
  } else {
    return 'Für Betriebe | recover'
  }
}

const getInstruction = () => {
  if (isCareEnv) {
    'So nutzen Sie recover für Ihre Pflegeeinrichtung'
  } else if (isHealthEnv) {
    return 'So nutzen Sie recover für Ihr Krankenhaus'
  } else {
    return 'So nutzt Du recover für deinen Betrieb'
  }
}

const getIntroText = () => {
  if (isFormal) {
    return (
      <>
        <p>
          Mit recover führen sie die Kontaktdatenliste Ihrer Gäste digital. Um
          die Daten zu schützen, werden sie von der App verschlüsselt.
        </p>
        <p>Die Einrichtung von recover dauert ca. 10 Min.</p>
      </>
    )
  } else {
    return (
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
    )
  }
}

const getSignupText = () => {
  if (isFormal) {
    ''
  } else {
    'Mit deinem Account kannst du QR Codes erstellen und Checkins deiner Gäste verwalten.'
  }
}

const getPrivateKeyExplanation = () => {
  if (isFormal) {
    return (
      <>
        <p>
          Wir freuen uns, dass Sie recover nutzen! '
          <span role="img" aria-label="Hurra!">
            🎉
          </span>
        </p>
        <p>
          Um die Echtheit Ihrer Daten zu überprüfen, werden wir uns bald per
          E-mail melden.
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
    )
  } else {
    return (
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
    )
  }
}

const getVerifyPrivateKeyExplanation = () => {
  if (isFormal) {
    return (
      <>
        <p>
          <strong>
            Sie werden die Datei rcvr_geheimer_schluessel.txt wieder brauchen,
            wenn das Gesundheitsamt anruft.
          </strong>
        </p>
        <p>
          Laden sie die Schlüsseldatei deshalb hier zur Bestätigung noch einmal
          hoch.
        </p>
      </>
    )
  } else {
    return (
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
    )
  }
}

const getFinishedText = () => {
  if (isFormal) {
    return (
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
    )
  } else {
    return (
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
    )
  }
}

export const title = getTitle()
export const instruction = getInstruction()
export const introText = getIntroText()
export const signupText = getSignupText()
export const privateKeyExplanation = getPrivateKeyExplanation()
export const verifyPrivateKeyExplanation = getVerifyPrivateKeyExplanation()
export const finishedText = getFinishedText()

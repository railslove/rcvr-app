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

export const title = getTitle()
export const instruction = getInstruction()
export const introText = getIntroText()
export const signupText = getSignupText()

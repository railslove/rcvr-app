import { isFreseniusEnv } from '~lib/config'

export default {
  pageTitle: 'Für Betriebe',

  instruction: isFreseniusEnv
    ? 'So nutzt Du recover für Deinen Betrieb'
    : 'Account Erstellen',

  letsGo: "Los geht's",

  setupIntro1: `Seit Corona sind viele Betriebe und Einrichtungen verpflichtet,
  Kontaktdaten zu erfassen. Erspar Dir die Zettelwirtschaft! Mit recover
  führst Du diese Liste digital. Um die Daten deiner Gäste zu schützen,
  werden sie von der App verschlüsselt. Während des Onboardings
  erstellst Du daher in wenigen Schritten ein digitales Schlüsselpaar.`,

  setupIntro2: `Nach dem Onboarding kannst Du Dich bei uns melden um zusammen mit
  unserem Team die Echtheit deiner Daten zu prüfen`,

  setupIntro3: `Die Einrichtung von recover dauert ca. 10 Min. Bist Du bereit? Dann
  lass uns starten.`,

  setupIntroCareHealth1: `Mit recover führen Sie die Kontaktdatenliste Ihrer Besucher digital.
  Um die Daten zu schützen, werden diese von der App verschlüsselt.`,

  setupIntroCareHealth2: `Die Einrichtung von recover dauert ca. 10 Min.`,
}

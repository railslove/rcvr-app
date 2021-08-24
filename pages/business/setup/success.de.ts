import { isFormal } from '~lib/config'

export default {
  title: 'Account erstellt',
  headline: isFormal ? ' Ihr privater Schlüssel.' : ' Dein privater Schlüssel.',

  privateKey1: 'Wir freuen uns, dass du recover nutzt!',
  privateKey2:
    'Um die Echtheit deiner Daten zu überprüfen, werden wir uns bald per E-Mail bei dir melden.',
  privateKeyNextStep: 'Nächster Schritt',
  privateKey3:
    'Ein Schlüssel wird erzeugt mit dem die Daten deiner Kunden verschlüsselt werden.',
  privateKey4: 'Bitte wähle hier aus, wie du den Schlüssel verwahren möchtest.',
  privateKey5:
    'Ohne Schlüssel kannst du keine Daten an das Gesundheitsamt senden.',

  privateKeyCareHealth1:
    'Ein Schlüssel wird erzeugt mit dem die Daten verschlüsselt werden.',
  privateKeyCareHealth2:
    'Bitte wählen Sie hier aus, wie Sie den Schlüssel verwahren möchten.',
  privateKeyCareHealth3:
    'Ohne Schlüssel können Sie keine Daten an das Gesundheitsamt senden.',

  privateKeyFresenius1: 'Wir freuen uns, dass du recover nutzt!',
  privateKeyFresenius2:
    'Um die Echtheit deiner Daten zu überprüfen, werden wir uns bald per E-Mail bei dir melden.',
  privateKeyFresenius3:
    "Bitte klicke auf 'Schlüssel herunterladen'. Das erzeugt eine Schlüsseldatei und startet den Download.",
  privateKeyFresenius4: 'Bitte speichere die Datei auf deinem Rechner ab.',
  privateKeyFresenius5:
    'Ohne Schlüssel kannst du keine Daten an das Gesundheitsamt senden.',

  contactInformation_care1:
    'Falls Sie Fragen zu Ihrem Account und zur Schlüsseldatei haben, melden Sie sich gern bei uns',

  contactInformation_health1:
    'Falls Sie Fragen zu Ihrem Account und zur Schlüsseldatei haben, melden Sie sich gern bei uns',

  contactInformationBSFLink: 'tel:022197356159',

  contactInformationBSFLinkText:
    'BFS Service GmbH 0221/97356-159 oder 0221/97356-160',

  printKeyButtonText: 'chlüssel drucken / notieren',
  downloadKeyButtonText: 'Schlüssel als Datei herunterladen',
}

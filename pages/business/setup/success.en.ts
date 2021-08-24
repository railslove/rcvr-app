import successDe from '~pages/business/setup/success.de'

const en: typeof successDe = {
  ...successDe,

  title: 'Account created',
  headline: ' Your private key.',

  privateKey1: "We're glad you're using recover!",
  privateKey2:
    "To verify the authenticity of your data, we'll be contacting you via email soon",
  privateKeyNextStep: 'Next step',
  privateKey3:
    'A key will be generated with which the data of your customers will be encrypted',
  privateKey4: 'Please select here how you want to store the key',
  privateKey5:
    "Without the key you can't send any data to the health department",

  privateKeyCareHealth1: 'A key is generated with which the data is encrypted',
  privateKeyCareHealth2: 'Please select here how you want to store the key',
  privateKeyCareHealth3:
    'Without a key, you cannot send data to the health department',

  privateKeyFresenius1: "We're glad you're using recover!",
  privateKeyFresenius2:
    'To verify the authenticity of your data, we will contact you via email soon.',
  privateKeyFresenius3:
    "Please click on 'Download key'. This will generate a key file and start the download.",
  privateKeyFresenius4: 'Please save the file to your computer.',
  privateKeyFresenius5:
    "Without a key, you can't send data to the health department",

  contactInformation_care1:
    'If you have any questions about your account and the key file, feel free to contact us',

  contactInformation_health1:
    'If you have any questions about your account and the key file, feel free to contact us',

  contactInformationBSFLinkText:
    'BFS Service GmbH 0221/97356-159 or 0221/97356-160',

  printKeyButtonText: 'print / note key',
  downloadKeyButtonText: 'Download key as file',
}

export default en

const de = {
  for: 'Für Betriebe',
  for_care: 'Für Pflegeeinrichtungen',
  for_health: 'Für Krankenhäuser',
  recover_care: 'recover care',
  recover_health: 'recover health',
  recover: 'recover',
}

const en: typeof de = {
  ...de,
  for: 'For businesses',
  for_care: 'For care facilities',
  for_health: 'For hospitals',
}

const pl: typeof de = {
  ...de,
  for: 'Dla przedsiębiorstw',
  for_care: 'Dla zakładów opieki',
  for_health: 'Dla szpitali',
}

const pageTitleLocales = {
  de,
  en,
  pl,
}

export default pageTitleLocales

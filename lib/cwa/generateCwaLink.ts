import { Checkin } from '../db'
import {
  CWALocationData,
  QRCodePayload,
  TraceLocationType,
} from './trace_location'

const base64toUint8 = (str: string): Uint8Array => {
  const len = str.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = str.charCodeAt(i)
  }
  return bytes
}

const locationType = (locationType: string) => {
  switch (locationType) {
    case 'retail':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_RETAIL
    case 'food_service':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_FOOD_SERVICE
    case 'craft':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_CRAFT
    case 'workplace':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_WORKPLACE
    case 'educational_institution':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_EDUCATIONAL_INSTITUTION
    case 'public_building':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_PUBLIC_BUILDING
    case 'other':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_OTHER
    default:
      return TraceLocationType.LOCATION_TYPE_UNSPECIFIED
  }
}

export const generateCwaLink = (checkin: Checkin) => {
  // Source for this key: https://github.com/corona-warn-app/cwa-documentation/blob/master/event_registration.md
  const public_key = window.atob(
    'gwLMzE153tQwAOf2MZoUXXfzWTdlSpfS99iZffmcmxOG9njSK4RTimFOFwDh6t0Tyw8XR01ugDYjtuKwjjuK49Oh83FWct6XpefPi9Skjxvvz53i9gaMmUEc96pbtoaA'
  )
  const cwaSeed = Uint8Array.from(atob(checkin.cwaSeed), (c) => c.charCodeAt(0))
  const payload = QRCodePayload.encode({
    version: 1,
    locationData: {
      version: 1,
      description: checkin.business,
      address: checkin.address || '',
      startTimestamp: 0,
      endTimestamp: 0,
    },
    crowdNotifierData: {
      version: 1,
      publicKey: base64toUint8(public_key),
      cryptographicSeed: cwaSeed,
    },
    vendorData: CWALocationData.encode({
      version: 1,
      type: locationType(checkin.locationType),
      defaultCheckInLengthInMinutes: checkin.autoCheckoutTime / 60,
    }).finish(),
  }).finish()

  return (
    'https://e.coronawarn.app/?v=1#' +
    btoa(String.fromCharCode.apply(null, payload))
  )
}

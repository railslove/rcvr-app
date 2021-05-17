/* eslint-disable */

/**
 * This file was generated using the [proto-defininition](https://github.com/corona-warn-app/cwa-event-qr-code/tree/main/proto/internal/pt)
 * of the CWA app.
 *
 * To recreate it, install protoc and ts-proto and run this command:
 *
 * protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. --ts_proto_opt=esModuleInterop=true ./trace_location.proto
 */

import { Long } from 'long'
import _m0 from 'protobufjs/minimal'

export const protobufPackage = 'internal.pt'

export enum TraceLocationType {
  LOCATION_TYPE_UNSPECIFIED = 0,
  LOCATION_TYPE_PERMANENT_OTHER = 1,
  LOCATION_TYPE_TEMPORARY_OTHER = 2,
  LOCATION_TYPE_PERMANENT_RETAIL = 3,
  LOCATION_TYPE_PERMANENT_FOOD_SERVICE = 4,
  LOCATION_TYPE_PERMANENT_CRAFT = 5,
  LOCATION_TYPE_PERMANENT_WORKPLACE = 6,
  LOCATION_TYPE_PERMANENT_EDUCATIONAL_INSTITUTION = 7,
  LOCATION_TYPE_PERMANENT_PUBLIC_BUILDING = 8,
  LOCATION_TYPE_TEMPORARY_CULTURAL_EVENT = 9,
  LOCATION_TYPE_TEMPORARY_CLUB_ACTIVITY = 10,
  LOCATION_TYPE_TEMPORARY_PRIVATE_EVENT = 11,
  LOCATION_TYPE_TEMPORARY_WORSHIP_SERVICE = 12,
  UNRECOGNIZED = -1,
}

export function traceLocationTypeFromJSON(object: any): TraceLocationType {
  switch (object) {
    case 0:
    case 'LOCATION_TYPE_UNSPECIFIED':
      return TraceLocationType.LOCATION_TYPE_UNSPECIFIED
    case 1:
    case 'LOCATION_TYPE_PERMANENT_OTHER':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_OTHER
    case 2:
    case 'LOCATION_TYPE_TEMPORARY_OTHER':
      return TraceLocationType.LOCATION_TYPE_TEMPORARY_OTHER
    case 3:
    case 'LOCATION_TYPE_PERMANENT_RETAIL':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_RETAIL
    case 4:
    case 'LOCATION_TYPE_PERMANENT_FOOD_SERVICE':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_FOOD_SERVICE
    case 5:
    case 'LOCATION_TYPE_PERMANENT_CRAFT':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_CRAFT
    case 6:
    case 'LOCATION_TYPE_PERMANENT_WORKPLACE':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_WORKPLACE
    case 7:
    case 'LOCATION_TYPE_PERMANENT_EDUCATIONAL_INSTITUTION':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_EDUCATIONAL_INSTITUTION
    case 8:
    case 'LOCATION_TYPE_PERMANENT_PUBLIC_BUILDING':
      return TraceLocationType.LOCATION_TYPE_PERMANENT_PUBLIC_BUILDING
    case 9:
    case 'LOCATION_TYPE_TEMPORARY_CULTURAL_EVENT':
      return TraceLocationType.LOCATION_TYPE_TEMPORARY_CULTURAL_EVENT
    case 10:
    case 'LOCATION_TYPE_TEMPORARY_CLUB_ACTIVITY':
      return TraceLocationType.LOCATION_TYPE_TEMPORARY_CLUB_ACTIVITY
    case 11:
    case 'LOCATION_TYPE_TEMPORARY_PRIVATE_EVENT':
      return TraceLocationType.LOCATION_TYPE_TEMPORARY_PRIVATE_EVENT
    case 12:
    case 'LOCATION_TYPE_TEMPORARY_WORSHIP_SERVICE':
      return TraceLocationType.LOCATION_TYPE_TEMPORARY_WORSHIP_SERVICE
    case -1:
    case 'UNRECOGNIZED':
    default:
      return TraceLocationType.UNRECOGNIZED
  }
}

export function traceLocationTypeToJSON(object: TraceLocationType): string {
  switch (object) {
    case TraceLocationType.LOCATION_TYPE_UNSPECIFIED:
      return 'LOCATION_TYPE_UNSPECIFIED'
    case TraceLocationType.LOCATION_TYPE_PERMANENT_OTHER:
      return 'LOCATION_TYPE_PERMANENT_OTHER'
    case TraceLocationType.LOCATION_TYPE_TEMPORARY_OTHER:
      return 'LOCATION_TYPE_TEMPORARY_OTHER'
    case TraceLocationType.LOCATION_TYPE_PERMANENT_RETAIL:
      return 'LOCATION_TYPE_PERMANENT_RETAIL'
    case TraceLocationType.LOCATION_TYPE_PERMANENT_FOOD_SERVICE:
      return 'LOCATION_TYPE_PERMANENT_FOOD_SERVICE'
    case TraceLocationType.LOCATION_TYPE_PERMANENT_CRAFT:
      return 'LOCATION_TYPE_PERMANENT_CRAFT'
    case TraceLocationType.LOCATION_TYPE_PERMANENT_WORKPLACE:
      return 'LOCATION_TYPE_PERMANENT_WORKPLACE'
    case TraceLocationType.LOCATION_TYPE_PERMANENT_EDUCATIONAL_INSTITUTION:
      return 'LOCATION_TYPE_PERMANENT_EDUCATIONAL_INSTITUTION'
    case TraceLocationType.LOCATION_TYPE_PERMANENT_PUBLIC_BUILDING:
      return 'LOCATION_TYPE_PERMANENT_PUBLIC_BUILDING'
    case TraceLocationType.LOCATION_TYPE_TEMPORARY_CULTURAL_EVENT:
      return 'LOCATION_TYPE_TEMPORARY_CULTURAL_EVENT'
    case TraceLocationType.LOCATION_TYPE_TEMPORARY_CLUB_ACTIVITY:
      return 'LOCATION_TYPE_TEMPORARY_CLUB_ACTIVITY'
    case TraceLocationType.LOCATION_TYPE_TEMPORARY_PRIVATE_EVENT:
      return 'LOCATION_TYPE_TEMPORARY_PRIVATE_EVENT'
    case TraceLocationType.LOCATION_TYPE_TEMPORARY_WORSHIP_SERVICE:
      return 'LOCATION_TYPE_TEMPORARY_WORSHIP_SERVICE'
    default:
      return 'UNKNOWN'
  }
}

export interface QRCodePayload {
  version: number
  locationData: TraceLocation | undefined
  crowdNotifierData: CrowdNotifierData | undefined
  /** byte sequence of CWALocationData */
  vendorData: Uint8Array
}

export interface TraceLocation {
  version: number
  /** max. 100 characters */
  description: string
  /** max. 100 characters */
  address: string
  /** UNIX timestamp (in seconds) */
  startTimestamp: number
  /** UNIX timestamp (in seconds) */
  endTimestamp: number
}

export interface CrowdNotifierData {
  version: number
  publicKey: Uint8Array
  cryptographicSeed: Uint8Array
}

export interface CWALocationData {
  version: number
  type: TraceLocationType
  defaultCheckInLengthInMinutes: number
}

const baseQRCodePayload: object = { version: 0 }

export const QRCodePayload = {
  encode(
    message: QRCodePayload,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.version !== 0) {
      writer.uint32(8).uint32(message.version)
    }
    if (message.locationData !== undefined) {
      TraceLocation.encode(
        message.locationData,
        writer.uint32(18).fork()
      ).ldelim()
    }
    if (message.crowdNotifierData !== undefined) {
      CrowdNotifierData.encode(
        message.crowdNotifierData,
        writer.uint32(26).fork()
      ).ldelim()
    }
    if (message.vendorData.length !== 0) {
      writer.uint32(34).bytes(message.vendorData)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QRCodePayload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQRCodePayload } as QRCodePayload
    message.vendorData = new Uint8Array()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.version = reader.uint32()
          break
        case 2:
          message.locationData = TraceLocation.decode(reader, reader.uint32())
          break
        case 3:
          message.crowdNotifierData = CrowdNotifierData.decode(
            reader,
            reader.uint32()
          )
          break
        case 4:
          message.vendorData = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QRCodePayload {
    const message = { ...baseQRCodePayload } as QRCodePayload
    message.vendorData = new Uint8Array()
    if (object.version !== undefined && object.version !== null) {
      message.version = Number(object.version)
    } else {
      message.version = 0
    }
    if (object.locationData !== undefined && object.locationData !== null) {
      message.locationData = TraceLocation.fromJSON(object.locationData)
    } else {
      message.locationData = undefined
    }
    if (
      object.crowdNotifierData !== undefined &&
      object.crowdNotifierData !== null
    ) {
      message.crowdNotifierData = CrowdNotifierData.fromJSON(
        object.crowdNotifierData
      )
    } else {
      message.crowdNotifierData = undefined
    }
    if (object.vendorData !== undefined && object.vendorData !== null) {
      message.vendorData = bytesFromBase64(object.vendorData)
    }
    return message
  },

  toJSON(message: QRCodePayload): unknown {
    const obj: any = {}
    message.version !== undefined && (obj.version = message.version)
    message.locationData !== undefined &&
      (obj.locationData = message.locationData
        ? TraceLocation.toJSON(message.locationData)
        : undefined)
    message.crowdNotifierData !== undefined &&
      (obj.crowdNotifierData = message.crowdNotifierData
        ? CrowdNotifierData.toJSON(message.crowdNotifierData)
        : undefined)
    message.vendorData !== undefined &&
      (obj.vendorData = base64FromBytes(
        message.vendorData !== undefined ? message.vendorData : new Uint8Array()
      ))
    return obj
  },

  fromPartial(object: DeepPartial<QRCodePayload>): QRCodePayload {
    const message = { ...baseQRCodePayload } as QRCodePayload
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version
    } else {
      message.version = 0
    }
    if (object.locationData !== undefined && object.locationData !== null) {
      message.locationData = TraceLocation.fromPartial(object.locationData)
    } else {
      message.locationData = undefined
    }
    if (
      object.crowdNotifierData !== undefined &&
      object.crowdNotifierData !== null
    ) {
      message.crowdNotifierData = CrowdNotifierData.fromPartial(
        object.crowdNotifierData
      )
    } else {
      message.crowdNotifierData = undefined
    }
    if (object.vendorData !== undefined && object.vendorData !== null) {
      message.vendorData = object.vendorData
    } else {
      message.vendorData = new Uint8Array()
    }
    return message
  },
}

const baseTraceLocation: object = {
  version: 0,
  description: '',
  address: '',
  startTimestamp: 0,
  endTimestamp: 0,
}

export const TraceLocation = {
  encode(
    message: TraceLocation,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.version !== 0) {
      writer.uint32(8).uint32(message.version)
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description)
    }
    if (message.address !== '') {
      writer.uint32(26).string(message.address)
    }
    if (message.startTimestamp !== 0) {
      writer.uint32(40).uint64(message.startTimestamp)
    }
    if (message.endTimestamp !== 0) {
      writer.uint32(48).uint64(message.endTimestamp)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TraceLocation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseTraceLocation } as TraceLocation
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.version = reader.uint32()
          break
        case 2:
          message.description = reader.string()
          break
        case 3:
          message.address = reader.string()
          break
        case 5:
          message.startTimestamp = longToNumber(reader.uint64() as Long)
          break
        case 6:
          message.endTimestamp = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): TraceLocation {
    const message = { ...baseTraceLocation } as TraceLocation
    if (object.version !== undefined && object.version !== null) {
      message.version = Number(object.version)
    } else {
      message.version = 0
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description)
    } else {
      message.description = ''
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address)
    } else {
      message.address = ''
    }
    if (object.startTimestamp !== undefined && object.startTimestamp !== null) {
      message.startTimestamp = Number(object.startTimestamp)
    } else {
      message.startTimestamp = 0
    }
    if (object.endTimestamp !== undefined && object.endTimestamp !== null) {
      message.endTimestamp = Number(object.endTimestamp)
    } else {
      message.endTimestamp = 0
    }
    return message
  },

  toJSON(message: TraceLocation): unknown {
    const obj: any = {}
    message.version !== undefined && (obj.version = message.version)
    message.description !== undefined && (obj.description = message.description)
    message.address !== undefined && (obj.address = message.address)
    message.startTimestamp !== undefined &&
      (obj.startTimestamp = message.startTimestamp)
    message.endTimestamp !== undefined &&
      (obj.endTimestamp = message.endTimestamp)
    return obj
  },

  fromPartial(object: DeepPartial<TraceLocation>): TraceLocation {
    const message = { ...baseTraceLocation } as TraceLocation
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version
    } else {
      message.version = 0
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description
    } else {
      message.description = ''
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address
    } else {
      message.address = ''
    }
    if (object.startTimestamp !== undefined && object.startTimestamp !== null) {
      message.startTimestamp = object.startTimestamp
    } else {
      message.startTimestamp = 0
    }
    if (object.endTimestamp !== undefined && object.endTimestamp !== null) {
      message.endTimestamp = object.endTimestamp
    } else {
      message.endTimestamp = 0
    }
    return message
  },
}

const baseCrowdNotifierData: object = { version: 0 }

export const CrowdNotifierData = {
  encode(
    message: CrowdNotifierData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.version !== 0) {
      writer.uint32(8).uint32(message.version)
    }
    if (message.publicKey.length !== 0) {
      writer.uint32(18).bytes(message.publicKey)
    }
    if (message.cryptographicSeed.length !== 0) {
      writer.uint32(26).bytes(message.cryptographicSeed)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CrowdNotifierData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseCrowdNotifierData } as CrowdNotifierData
    message.publicKey = new Uint8Array()
    message.cryptographicSeed = new Uint8Array()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.version = reader.uint32()
          break
        case 2:
          message.publicKey = reader.bytes()
          break
        case 3:
          message.cryptographicSeed = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): CrowdNotifierData {
    const message = { ...baseCrowdNotifierData } as CrowdNotifierData
    message.publicKey = new Uint8Array()
    message.cryptographicSeed = new Uint8Array()
    if (object.version !== undefined && object.version !== null) {
      message.version = Number(object.version)
    } else {
      message.version = 0
    }
    if (object.publicKey !== undefined && object.publicKey !== null) {
      message.publicKey = bytesFromBase64(object.publicKey)
    }
    if (
      object.cryptographicSeed !== undefined &&
      object.cryptographicSeed !== null
    ) {
      message.cryptographicSeed = bytesFromBase64(object.cryptographicSeed)
    }
    return message
  },

  toJSON(message: CrowdNotifierData): unknown {
    const obj: any = {}
    message.version !== undefined && (obj.version = message.version)
    message.publicKey !== undefined &&
      (obj.publicKey = base64FromBytes(
        message.publicKey !== undefined ? message.publicKey : new Uint8Array()
      ))
    message.cryptographicSeed !== undefined &&
      (obj.cryptographicSeed = base64FromBytes(
        message.cryptographicSeed !== undefined
          ? message.cryptographicSeed
          : new Uint8Array()
      ))
    return obj
  },

  fromPartial(object: DeepPartial<CrowdNotifierData>): CrowdNotifierData {
    const message = { ...baseCrowdNotifierData } as CrowdNotifierData
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version
    } else {
      message.version = 0
    }
    if (object.publicKey !== undefined && object.publicKey !== null) {
      message.publicKey = object.publicKey
    } else {
      message.publicKey = new Uint8Array()
    }
    if (
      object.cryptographicSeed !== undefined &&
      object.cryptographicSeed !== null
    ) {
      message.cryptographicSeed = object.cryptographicSeed
    } else {
      message.cryptographicSeed = new Uint8Array()
    }
    return message
  },
}

const baseCWALocationData: object = {
  version: 0,
  type: 0,
  defaultCheckInLengthInMinutes: 0,
}

export const CWALocationData = {
  encode(
    message: CWALocationData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.version !== 0) {
      writer.uint32(8).uint32(message.version)
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type)
    }
    if (message.defaultCheckInLengthInMinutes !== 0) {
      writer.uint32(24).uint32(message.defaultCheckInLengthInMinutes)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CWALocationData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseCWALocationData } as CWALocationData
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.version = reader.uint32()
          break
        case 2:
          message.type = reader.int32() as any
          break
        case 3:
          message.defaultCheckInLengthInMinutes = reader.uint32()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): CWALocationData {
    const message = { ...baseCWALocationData } as CWALocationData
    if (object.version !== undefined && object.version !== null) {
      message.version = Number(object.version)
    } else {
      message.version = 0
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = traceLocationTypeFromJSON(object.type)
    } else {
      message.type = 0
    }
    if (
      object.defaultCheckInLengthInMinutes !== undefined &&
      object.defaultCheckInLengthInMinutes !== null
    ) {
      message.defaultCheckInLengthInMinutes = Number(
        object.defaultCheckInLengthInMinutes
      )
    } else {
      message.defaultCheckInLengthInMinutes = 0
    }
    return message
  },

  toJSON(message: CWALocationData): unknown {
    const obj: any = {}
    message.version !== undefined && (obj.version = message.version)
    message.type !== undefined &&
      (obj.type = traceLocationTypeToJSON(message.type))
    message.defaultCheckInLengthInMinutes !== undefined &&
      (obj.defaultCheckInLengthInMinutes =
        message.defaultCheckInLengthInMinutes)
    return obj
  },

  fromPartial(object: DeepPartial<CWALocationData>): CWALocationData {
    const message = { ...baseCWALocationData } as CWALocationData
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version
    } else {
      message.version = 0
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type
    } else {
      message.type = 0
    }
    if (
      object.defaultCheckInLengthInMinutes !== undefined &&
      object.defaultCheckInLengthInMinutes !== null
    ) {
      message.defaultCheckInLengthInMinutes =
        object.defaultCheckInLengthInMinutes
    } else {
      message.defaultCheckInLengthInMinutes = 0
    }
    return message
  },
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'))
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64)
  const arr = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i)
  }
  return arr
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'))
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = []
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]))
  }
  return btoa(bin.join(''))
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}

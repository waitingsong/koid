/* eslint-disable no-bitwise */
import assert from 'node:assert'

import type { IdInfo } from './types.js'
import { KoidMsg } from './types.js'


export const POW10 = Math.pow(2, 10)
export const POW26 = Math.pow(2, 26)
export const maxBigintId = BigInt('9223372036854775807')

/**
 * Retrieve Id info from hex, bigint string, Buffer.
 * like '50dddcbfb5c00001' or '0x50dddcbfb5c00001' or "6755455236955799552"
 */
export function retrieveFromId(id: bigint | string | Readonly<Buffer>, epoch = 0): IdInfo {
  if (! id) {
    throw new TypeError(KoidMsg.NotValidIdFormat)
  }

  switch (typeof id) {
    case 'bigint':
      return retrieveFromBigint(id, epoch)

    case 'string':
      return retrieveFromStr(id, epoch)

    default:
      return retrieveFromBuffer(id, epoch)
  }
}


/**
 * Retrieve Id info from hex and bigint string
 * like '2a5ee1107597000', '50dddcbfb5c00001' or '0x50dddcbfb5c00001' or "6755455236955799552"
 */
function retrieveFromStr(id: string, epoch: number): IdInfo {
  const int8 = isValidBigintStr(id)
  return int8
    ? retrieveFromBigint(int8, epoch)
    : retrieveFromHex(id, epoch)
}

/**
 * Detect bigint string, eg. '6755455236955799552'
 */
export function isValidBigintStr(id: string): bigint | false {
  const str = id.toLowerCase().trim()

  if (/^[1-9]\d{9,18}$/u.test(str)) {
    const int8 = BigInt(str)
    if (isValidBigintId(int8)) {
      return int8
    }
    throw new TypeError(KoidMsg.NotValidBigintString + `: "${str}"`)
  }

  return false
}


export function isValidBigintId(id: bigint): boolean {
  return !! (id >= 0 && id <= maxBigintId)
}


export function isValidHexString(id: string): Buffer | false {
  let hex = id.toLowerCase().trim()

  // '50dddcbfb5c00001' or '0x50dddcbfb5c00001', '0000000000400000'

  if (hex.startsWith('0x')) {
    hex = hex.slice(2)
  }

  if (hex.length % 2 !== 0) {
    hex = '0' + hex
  }

  if (! /^[\da-f]{6,16}/u.test(hex)) {
    return false
  }

  if (hex.length !== 16) {
    hex = hex.padStart(16, '0')
  }

  const buf = Buffer.from(hex, 'hex')
  return buf.length === 8 ? buf : false
}

/**
 * Retrieve Id info from hex,
 * like '50dddcbfb5c00001' or '0x50dddcbfb5c00001'
 */
function retrieveFromHex(id: string, epoch: number): IdInfo {
  const buf = isValidHexString(id)
  if (! buf) {
    throw new TypeError(KoidMsg.NotValidHexString + `: "${id}"`)
  }

  return retrieveFromBuffer(buf, epoch)
}


function retrieveFromBigint(id: bigint, epoch: number): IdInfo {
  const buf = Buffer.alloc(8)
  buf.writeBigUInt64BE(id)
  return retrieveFromBuffer(buf, epoch)
}


function retrieveFromBuffer(id: Readonly<Buffer>, epoch: number): IdInfo {
  assert(id.length === 8)
  // 00000010 00110000 10000001 01010000 11101100 00.000000 00000000 00000000
  // 5d c2 d8 27 be 7f f0 00
  // 01011101 11000010 11011000 00100111 10111110 01.111111 1111.0000 00000000

  isValidBigintId(id.readBigInt64BE())

  const p0 = id.readUInt32BE()
  const p4 = id.readUInt8(4)
  const p5 = id.readUInt8(5)
  // eslint-disable-next-line no-mixed-operators
  const timestamp = p0 * POW10 + (p4 << 2) + (p5 >> 6) + epoch
  // eslint-disable-next-line no-mixed-operators
  const dataCenter = (p5 & 0x3F) >> 1 & 0x1F

  const p6 = id.readUInt8(6)
  const worker = ((p5 & 0x3F & 1) << 4) + (p6 >> 4) & 0x1F

  const p7 = id.readUInt8(7)
  const sequence = (p6 << 8) + p7 & 0x1F

  const hex = id.toString('hex')

  const ret: IdInfo = {
    dataCenter, worker, timestamp, sequence, hex,
  }
  return ret
}


export function validEpoch(epoch: number): void {
  const now = Date.now()
  if (now <= epoch) {
    throw new TypeError(`${KoidMsg.NotValidEpoch}, input: "${epoch}", now: "${now}"`)
  }
}

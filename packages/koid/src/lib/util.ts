/* eslint-disable no-bitwise */
import * as assert from 'assert'

import { IdInfo } from './types'


export const POW10 = Math.pow(2, 10)
export const POW26 = Math.pow(2, 26)

export function retrieveFromId(id: bigint | string | Readonly<Buffer>): IdInfo {
  switch (typeof id) {
    case 'bigint':
      return retrieveFromBigint(id)
    case 'string':
      return retrieveFromHex(id)
    default:
      return retrieveFromBuffer(id)
  }
}

export function retrieveFromBuffer(id: Readonly<Buffer>): IdInfo {
  assert(id.length === 8)
  // 00000010 00110000 10000001 01010000 11101100 00.000000 00000000 00000000
  // 5d c2 d8 27 be 7f f0 00
  // 01011101 11000010 11011000 00100111 10111110 01.111111 1111.0000 00000000

  const p0 = id.readUInt32BE()
  const p4 = id.readUInt8(4)
  const p5 = id.readUInt8(5)
  // eslint-disable-next-line no-mixed-operators
  const timestamp = p0 * POW10 + (p4 << 2) + (p5 >> 6)
  // eslint-disable-next-line no-mixed-operators
  const dataCenter = (p5 & 0x3F) >> 1 & 0x1F

  const p6 = id.readUInt8(6)
  const worker = ((p5 & 0x3F & 1) << 4) + (p6 >> 4) & 0x1F

  const p7 = id.readUInt8(7)
  const sequence = (p6 << 8) + p7 & 0x1F

  const ret: IdInfo = {
    dataCenter, worker, timestamp, sequence,
  }
  return ret
}

/**
 * Retrieve Id info from hex,
 * like '50dddcbfb5c00001' or '0x50dddcbfb5c00001'
 */
export function retrieveFromHex(id: string): IdInfo {
  let hex = id.toLowerCase()
  /* istanbul ignore else */
  if (hex.startsWith('0x')) {
    hex = hex.slice(2)
  }
  assert(/^[\da-f]{16}/u.test(hex))

  const buf = Buffer.from(hex, 'hex')
  return retrieveFromBuffer(buf)
}


export function retrieveFromBigint(id: bigint): IdInfo {
  const buf = Buffer.alloc(8)
  buf.writeBigUInt64BE(id)
  return retrieveFromBuffer(buf)
}


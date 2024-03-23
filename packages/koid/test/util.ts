
export function IdsEqualIgnoreMs(buf: Buffer, hex: string, permit = 1): boolean {
  // 00000010001100001000000101010000111011 0001 0000000000 000000000000
  // 00000010001100001000000101010000111011 0000 0000000000 000000000000
  const bb = Buffer.from(hex.slice(2), 'hex')

  const int1 = buf[5]!
  const int2 = bb[5]!
  const intDiff = Math.abs((int1 >> 6) - (int2 >> 6))

  const ret = intDiff <= permit
  if (! ret) {
    console.info(
      'int1: %d, int2: %d intDiff: %d, hex: %s',
      int1,
      int2,
      intDiff,
      hex,
    )
  }
  return ret
}


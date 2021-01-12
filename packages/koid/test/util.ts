
export function IdsEqualIgnoreThreeMs(result: Buffer, hex: string): boolean {
  // 100011000010000001010100001110110000 0000000000 000000000000
  // 100011000010000001010100001110110001 0000000000 000000000000
  const id = result.readBigInt64BE()
  const baseBuf = Buffer.from(hex.slice(2), 'hex')
  const baseId = baseBuf.readBigInt64BE()

  const diff = (id - baseId).toString()
  const diff2 = diff.slice(0, -22)
  const ret = diff2 === '1' || diff2 === '2' || diff2 === '3'
  if (! ret) {
    console.info('diff:', diff)
  }
  return ret
}


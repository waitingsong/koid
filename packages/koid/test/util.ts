
export function IdsEqualIgnoreThreeMs(result: Buffer, hex: string): boolean {
  // 100011000010000001010100001110110000 0000000000 000000000000
  // 100011000010000001010100001110110001 0000000000 000000000000
  const id = result.readBigInt64BE()
  const baseBuf = Buffer.from(hex.slice(2), 'hex')
  const baseId = baseBuf.readBigInt64BE()

  const diff = (id - baseId).toString()
  const ret = diff === '1' || diff === '2' || diff === '3'
  if (! ret) {
    console.info('diff:', diff)
  }
  return ret
}


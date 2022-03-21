import assert from 'assert/strict'
import { relative } from 'path'

import { KoidFactory, KoidMsg, retrieveFromId } from '../src/index'


const filename = relative(process.cwd(), __filename).replace(/\\/ug, '/')

describe(filename, () => {

  describe('should work', () => {
    it('normal', () => {
      const epoch = Date.now() - 1
      const inst = KoidFactory({
        node: 0,
        epoch,
      })
      const buf = inst.next
      const id2 = inst.nextBigint
      const id = buf.readBigInt64BE()
      const hex = buf.toString('hex')
      const hexs = id.toString(16)
      console.info({ hex, hexs })
      assert(hex === '0000000000400000' || hex === '0000000000800000', hex)
      assert(hexs === '400000' || hexs === '800000', hexs)

      const retBuf = retrieveFromId(buf, epoch)
      const retId = retrieveFromId(id, epoch)
      const retHex = retrieveFromId(hex, epoch)
      const retHexs = retrieveFromId(hexs, epoch)
      assert(retBuf.hex === hex)
      assert(retId.hex === hex)
      assert(retHex.hex === hex)
      assert(retHexs.hex === hex)

      const hex2s = id2.toString(16)
      console.info({ hex2s })
      assert(hex2s === '400001' || hex2s === '800000' || hex2s === '800001', hex2s)
      const ret2s = retrieveFromId(hex2s, epoch)
      const expect2s = hex2s.padStart(16, '0')
      console.info({ ret2s, expect2s })
      assert(ret2s.hex === expect2s)
    })
  })

})


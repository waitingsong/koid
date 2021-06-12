/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable node/no-extraneous-require */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { KoidFactory, KoidMsg, retrieveFromId } from '../src/index'


const assert = require('power-assert')


const filename = basename(__filename)

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
      assert(hex === '0000000000400000')
      assert(hexs === '400000')

      const retBuf = retrieveFromId(buf, epoch)
      const retId = retrieveFromId(id, epoch)
      const retHex = retrieveFromId(hex, epoch)
      const retHexs = retrieveFromId(hexs, epoch)
      assert(retBuf.hex === hex)
      assert(retId.hex === hex)
      assert(retHex.hex === hex)
      assert(retHexs.hex === hex)

      const hex2s = id2.toString(16)
      assert(hex2s === '400001')
      const ret2s = retrieveFromId(hex2s, epoch)
      assert(ret2s.hex === hex2s.padStart(16, '0'))
    })
  })

})


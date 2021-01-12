import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { KoidFactory } from '../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
    it('generate w/o passing config', () => {
      const inst = KoidFactory()
      const buf = inst.next
      const id = buf.readBigInt64BE()
      assert(id > 0)
    })

    it('config getter', () => {
      const dataCenter = 9
      const worker = 7
      const inst = KoidFactory({ dataCenter, worker })

      const { config } = inst
      assert(config.dataCenter === dataCenter)
      assert(config.worker === worker)
      assert(config.epoch === 0)
    })
  })

})


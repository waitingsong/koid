import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { KoidFactory } from '../src/index.js'

import { config1, config2, config4, testArr } from './config.test.js'
import { IdsEqualIgnoreMs } from './util.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
    it('normal', () => {
      const dataCenter = 0
      const worker = 0

      const inst = KoidFactory({
        dataCenter,
        worker,
      })
      const buf = inst.next
      const id = buf.readBigInt64BE()
      assert(id > 0)

      const { config } = inst
      assert(config.dataCenter === dataCenter)
      assert(config.worker === worker)
    })

    it('generate one', () => {
      const tconfig = config1
      const tc0 = tconfig[0]!
      assert(tc0)

      const dataCenter = 0
      const worker = 0

      const inst = KoidFactory({
        dataCenter,
        worker,
        epoch: Date.now() - tc0.time,
      })
      const buf = inst.next

      const { config } = inst
      assert(config.dataCenter === dataCenter)
      assert(config.worker === worker)

      try {
        const idHex = buf.toString('hex')
        assert(`0x${idHex}` === tc0.idStr)
      }
      catch (ex) {
        if (IdsEqualIgnoreMs(buf, tc0.idStr)) {
          return
        }
        throw ex
      }
    })

    it('generate two', () => {
      const tconfig = config2
      const tc0 = tconfig[0]!
      assert(tc0)

      const dataCenter = tc0.dataCenter
      const worker = tc0.worker
      const len = tconfig.length
      const ret = new Array<Buffer>(len * 8)

      const inst = KoidFactory({
        dataCenter,
        worker,
        epoch: Date.now() - tc0.time,
      })

      for (let i = 0; i < len; i = i + 8) {
        ret[i] = inst.next
      }
      ret.forEach((buf, index) => {
        const { config } = inst
        assert(config.dataCenter === dataCenter)
        assert(config.worker === worker)

        const tci = tconfig[index]!
        assert(tci)
        try {
          const idHex = buf.toString('hex')
          assert(`0x${idHex}` === tci.idStr)
        }
        catch (ex) {
          if (IdsEqualIgnoreMs(buf, tc0.idStr)) {
            return
          }
          throw ex
        }
      })
    })

    it('generate four', () => {
      const tconfig = config4
      const tc0 = tconfig[0]!
      assert(tc0)

      const dataCenter = tc0.dataCenter
      const worker = tc0.worker
      const len = tconfig.length
      const ret = new Array<Buffer>(len * 8)

      const inst = KoidFactory({
        dataCenter: tc0.dataCenter,
        worker: tc0.worker,
        epoch: Date.now() - tc0.time,
      })

      for (let i = 0; i < len; i = i + 8) {
        ret[i] = inst.next
      }
      ret.forEach((buf, index) => {
        const { config } = inst
        assert(config.dataCenter === dataCenter)
        assert(config.worker === worker)

        IdsEqualIgnoreMs(buf, tc0.idStr)

        const tci = tconfig[index]!
        assert(tci)
        try {
          const idHex = buf.toString('hex')
          assert(`0x${idHex}` === tci.idStr)
        }
        catch (ex) {
          if (IdsEqualIgnoreMs(buf, tc0.idStr)) {
            return
          }
          throw ex
        }
      })
    })
  })

})


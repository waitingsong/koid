import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { KoidFactory } from '../src/index'

import { config1, config4, config2 } from './config.test'
import { IdsEqualIgnoreMs } from './util'


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
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
      const dataCenter = 0
      const worker = 0

      const inst = KoidFactory({
        dataCenter,
        worker,
        epoch: Date.now() - config1[0].time,
      })
      const buf = inst.next

      const { config } = inst
      assert(config.dataCenter === dataCenter)
      assert(config.worker === worker)

      try {
        const idHex = buf.toString('hex')
        assert(`0x${idHex}` === config1[0].idStr)
      }
      catch (ex) {
        if (IdsEqualIgnoreMs(buf, config1[0].idStr)) {
          return
        }
        throw ex
      }
    })

    it('generate two', () => {
      const dataCenter = config2[0].dataCenter
      const worker = config2[0].worker
      const len = config2.length
      const ret = new Array<Buffer>(len * 8)

      const inst = KoidFactory({
        dataCenter,
        worker,
        epoch: Date.now() - config2[0].time,
      })

      for (let i = 0; i < len; i = i + 8) {
        ret[i] = inst.next
      }
      ret.forEach((buf, index) => {
        const { config } = inst
        assert(config.dataCenter === dataCenter)
        assert(config.worker === worker)

        try {
          const idHex = buf.toString('hex')
          assert(`0x${idHex}` === config2[index].idStr)
        }
        catch (ex) {
          if (IdsEqualIgnoreMs(buf, config1[0].idStr)) {
            return
          }
          throw ex
        }
      })
    })

    it('generate four', () => {
      const dataCenter = config4[0].dataCenter
      const worker = config4[0].worker
      const len = config4.length
      const ret = new Array<Buffer>(len * 8)

      const inst = KoidFactory({
        dataCenter: config4[0].dataCenter,
        worker: config4[0].worker,
        epoch: Date.now() - config4[0].time,
      })

      for (let i = 0; i < len; i = i + 8) {
        ret[i] = inst.next
      }
      ret.forEach((buf, index) => {
        const { config } = inst
        assert(config.dataCenter === dataCenter)
        assert(config.worker === worker)

        IdsEqualIgnoreMs(buf, config4[0].idStr)

        try {
          const idHex = buf.toString('hex')
          assert(`0x${idHex}` === config4[index].idStr)
        }
        catch (ex) {
          if (IdsEqualIgnoreMs(buf, config4[0].idStr)) {
            return
          }
          throw ex
        }
      })
    })
  })

})


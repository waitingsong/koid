/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable node/no-extraneous-require */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { KoidFactory } from '../src/index'

import { config1, config2, config4 } from './config.test'
import { IdsEqualIgnoreMs } from './util'


const assert = require('power-assert')


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
      const tconfig = config1
      const dataCenter = 0
      const worker = 0

      const inst = KoidFactory({
        dataCenter,
        worker,
        epoch: Date.now() - tconfig[0].time,
      })
      const buf = inst.next

      const { config } = inst
      assert(config.dataCenter === dataCenter)
      assert(config.worker === worker)

      try {
        const idHex = buf.toString('hex')
        assert(`0x${idHex}` === tconfig[0].idStr)
      }
      catch (ex) {
        if (IdsEqualIgnoreMs(buf, tconfig[0].idStr)) {
          return
        }
        throw ex
      }
    })

    it('generate two', () => {
      const tconfig = config2
      const dataCenter = tconfig[0].dataCenter
      const worker = tconfig[0].worker
      const len = tconfig.length
      const ret = new Array<Buffer>(len * 8)

      const inst = KoidFactory({
        dataCenter,
        worker,
        epoch: Date.now() - tconfig[0].time,
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
          assert(`0x${idHex}` === tconfig[index].idStr)
        }
        catch (ex) {
          if (IdsEqualIgnoreMs(buf, tconfig[0].idStr)) {
            return
          }
          throw ex
        }
      })
    })

    it('generate four', () => {
      const tconfig = config4
      const dataCenter = tconfig[0].dataCenter
      const worker = tconfig[0].worker
      const len = tconfig.length
      const ret = new Array<Buffer>(len * 8)

      const inst = KoidFactory({
        dataCenter: tconfig[0].dataCenter,
        worker: tconfig[0].worker,
        epoch: Date.now() - tconfig[0].time,
      })

      for (let i = 0; i < len; i = i + 8) {
        ret[i] = inst.next
      }
      ret.forEach((buf, index) => {
        const { config } = inst
        assert(config.dataCenter === dataCenter)
        assert(config.worker === worker)

        IdsEqualIgnoreMs(buf, tconfig[0].idStr)

        try {
          const idHex = buf.toString('hex')
          assert(`0x${idHex}` === tconfig[index].idStr)
        }
        catch (ex) {
          if (IdsEqualIgnoreMs(buf, tconfig[0].idStr)) {
            return
          }
          throw ex
        }
      })
    })
  })

})


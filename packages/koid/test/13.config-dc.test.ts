import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { KoidFactory } from '../src/index'

import { configArr1, config4, config2 } from './config.test'


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
    it('generate one', () => {
      const inst = KoidFactory({
        dataCenter: 0,
        worker: 0,
        epoch: Date.now() - configArr1[0].time,
      })
      const buf = inst.next
      const idHex = buf.toString('hex')
      assert(`0x${idHex}` === configArr1[0].idStr)
    })

    it('generate two', () => {
      const len = config2.length
      const ret = new Array<Buffer>(len * 8)
      const inst = KoidFactory({
        dataCenter: config2[0].dataCenter,
        worker: config2[0].worker,
        epoch: Date.now() - config2[0].time,
      })

      for (let i = 0; i < len; i = i + 8) {
        ret[i] = inst.next
      }
      ret.forEach((buf, index) => {
        const idHex = buf.toString('hex')
        assert(`0x${idHex}` === config2[index].idStr)
      })
    })

    it('generate four', () => {
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
        const idHex = buf.toString('hex')
        assert(`0x${idHex}` === config4[index].idStr)
      })
    })
  })

})


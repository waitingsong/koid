import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { KoidFactory } from '../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
    it('next w/o passing config', () => {
      const inst = KoidFactory()
      const buf = inst.next
      const id = buf.readBigInt64BE()
      assert(id > 0)
      console.log('buf value:', buf)
      console.log('bigInt id value:', id)
      console.log('hex id value:', buf.toString('hex'))
    })

    it('next with passing config', () => {
      const inst = KoidFactory({
        dataCenter: 0,
        worker: 0,
      })
      const buf = inst.next
      const id = buf.readBigInt64BE()
      assert(id > 0)
      console.log('buf value:', buf)
      console.log('bigInt id value:', id)
      console.log('hex id value:', buf.toString('hex'))
    })

    it('nextBigint w/o passing config', () => {
      const inst = KoidFactory()
      const id = inst.nextBigint
      assert(id > 0)
    })

    it('nextBigint with passing config', () => {
      const inst = KoidFactory({
        dataCenter: 0,
        worker: 0,
      })
      const id = inst.nextBigint
      assert(id > 0)
    })

    it('config getter with dc', () => {
      const dataCenter = 9
      const worker = 7
      const inst = KoidFactory({ dataCenter, worker })

      const { config } = inst
      assert(config.dataCenter === dataCenter)
      assert(config.worker === worker)
      assert(config.epoch === 0)
    })

    it('config getter with id', () => {
      const arr: [number, number, number][] = [
        [0, 0, 0],
        [1, 0, 1],
        [31, 0, 31],
        [32, 1, 0],
        [33, 1, 1],
        [34, 1, 2],
        [1023, 31, 31],
      ]
      arr.forEach(([id, dc, wk]) => {
        const inst = KoidFactory({ id })

        const { config } = inst
        assert(config.dataCenter === dc)
        assert(config.worker === wk)
        assert(config.epoch === 0)
      })
    })
  })

})


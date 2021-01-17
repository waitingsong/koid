/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable node/no-extraneous-require */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { ConfigDc, KoidFactory } from '../src/index'


const assert = require('power-assert')


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


  describe('should koid.retrieveFromId() works', () => {
    it('normal', () => {
      const config1: ConfigDc = {
        dataCenter: 0,
        worker: 0,
      }
      const config2: ConfigDc = {
        dataCenter: 7,
        worker: 30,
      }
      const config3: ConfigDc = {
        dataCenter: 31,
        worker: 31,
      };

      [config1, config2, config3].forEach((config) => {
        const koid = KoidFactory(config)

        const time = Date.now()
        const id = koid.next
        const int = id.readBigInt64BE()
        const intStr = id.readBigInt64BE().toString()
        const hex = id.toString('hex')

        const infoBuf = koid.retrieveFromId(id)
        const infoInt = koid.retrieveFromId(int)
        const infoStr = koid.retrieveFromId(intStr)
        const infoHex = koid.retrieveFromId(hex)
        const infoHexPreifx = koid.retrieveFromId('0x' + hex)

        console.info({
          id, int, hex, time, infoBuf,
        });
        [infoBuf, infoInt, infoHex, infoStr, infoHexPreifx].forEach((info) => {
          assert(info.dataCenter === config.dataCenter, new Date(info.timestamp).toString())
          assert(info.worker === config.worker)
          assert(info.timestamp === time || info.timestamp === time + 1)
        })
      })
    })
  })

})


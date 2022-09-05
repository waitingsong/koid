import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Config, KoidFactory, retrieveFromId } from '../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
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
      arr.forEach(([node, dc, wk]) => {
        const inst = KoidFactory({ node })

        const { config } = inst
        assert(config.dataCenter === dc)
        assert(config.worker === wk)
        assert(config.epoch === 0)
      })
    })
  })


  describe('should koid.nextHex work', () => {
    it('normal', () => {
      const inst = KoidFactory()
      const hex = inst.nextHex
      assert(hex.length === 16)
    })
  })

  describe('should koid.retrieveFromId() work', () => {
    it('normal', () => {
      const inst = KoidFactory()
      const hex = inst.nextHex

      const info = inst.retrieveFromId(hex)
      assert(info)
      console.log({ info })
      assert(info.dataCenter >= 0)
      assert(info.hex === hex)
      assert(info.sequence >= 0)
      assert(info.timestamp > 0)
      assert(info.worker > 0)
    })

    it('normal', () => {
      const config1: Config = {
        dataCenter: 0,
        worker: 0,
      }
      const config2: Config = {
        dataCenter: 7,
        worker: 30,
      }
      const config3: Config = {
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

    it('with epoch', () => {
      // '2000-01-01T00:00:00Z'
      const epoch = 946684800000
      const centerMax = 33
      const workerMax = 33

      for (let i = 0; i < centerMax; i += 1) {
        for (let j = 0; j < workerMax; j += 1) {
          const inst = KoidFactory({
            dataCenter: i,
            worker: j,
            epoch,
          })
          const now = Date.now()
          const buf = inst.next

          const info = inst.retrieveFromId(buf)
          const info2 = retrieveFromId(buf, epoch)
          assert(info.timestamp === info2.timestamp)
          assert(info.dataCenter === info2.dataCenter)
          assert(info.worker === info2.worker)
          assert(info.sequence === info2.sequence)

          // console.log('info:', info)
          // console.log('time:', new Date(info.timestamp).toISOString())
          const diff = info.timestamp - now
          assert(diff < 6)
        }
      }
    })
  })

})


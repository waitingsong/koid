import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import type { Config } from '../src/index.js'
import { KoidFactory, retrieveFromId } from '../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should koid.retrieveFromId() work', () => {
    it('normal', () => {
      const inst = KoidFactory()
      const hex = inst.nextHex

      const info = inst.retrieveFromId(hex)
      assert(info)
      console.log({ info })
      assert(info.dataCenter >= 0, info.dataCenter.toString())
      assert(info.hex === hex, info.hex)
      assert(info.sequence >= 0, info.sequence.toString())
      assert(info.timestamp > 0, info.timestamp.toString())
      assert(info.worker > 0, info.worker.toString())
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
        const infoHexPrefix = koid.retrieveFromId('0x' + hex)

        console.info({
          id, int, hex, time, infoBuf,
        });
        [infoBuf, infoInt, infoHex, infoStr, infoHexPrefix].forEach((info) => {
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


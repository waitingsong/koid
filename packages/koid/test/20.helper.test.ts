import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Config, genConfigRandom, KoidMsg } from '../src/index.js'
import { parseConfig, waitTillNextMillisecond } from '../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should parseConfig() work', () => {
    it('perfer using node instead of dataCenter', () => {
      const dataCenter = 2
      const worker = 3
      const node = 1
      // @ts-expect-error
      const config: Config = {
        node,
        dataCenter,
        worker,
      }
      const ret = parseConfig(config)
      assert(ret.epoch === 0)
      const genId = node << 12
      assert(ret.genId === genId)
    })

    it('dataCenter overflow', () => {
      const dataCenter = 132
      const worker = 0
      const config: Config = {
        dataCenter,
        worker,
      }
      const ret = parseConfig(config)
      const dataCenterNor = dataCenter & 0x1F

      const genId = (dataCenterNor << 5 | worker & 0x3F) << 12
      assert(ret.dataCenter === dataCenterNor)
      assert(ret.genId === genId)
      assert(ret.epoch === 0)
    })

    it('worker overflow', () => {
      const dataCenter = 0
      const worker = 132
      const config: Config = {
        dataCenter,
        worker,
      }
      const ret = parseConfig(config)
      const dataCenterNor = dataCenter & 0x1F

      const genId = (dataCenterNor << 5 | worker & 0x3F) << 12
      assert(ret.dataCenter === dataCenterNor)
      assert(ret.genId === genId)
      assert(ret.epoch === 0)
    })

    it('dataCenter and worker overflow', () => {
      const dataCenter = 123
      const worker = 132
      const config: Config = {
        dataCenter,
        worker,
      }
      const ret = parseConfig(config)
      const dataCenterNor = dataCenter & 0x1F

      const genId = (dataCenterNor << 5 | worker & 0x3F) << 12
      assert(ret.dataCenter === dataCenterNor)
      assert(ret.genId === genId)
      assert(ret.epoch === 0)
    })

    it('genConfigRandom()', () => {
      const { dataCenter, worker, epoch } = genConfigRandom()
      assert(dataCenter >= 0 && dataCenter <= 0x1F)
      assert(worker >= 0 && worker <= 0x1F)
      assert(epoch === 0)
    })


    it('throw Error with invalid epoch', () => {
      const dataCenter = 132
      const worker = 0
      const config: Config = {
        dataCenter,
        worker,
        epoch: Date.now(),
      }
      try {
        parseConfig(config)
      }
      catch (ex) {
        assert(ex instanceof TypeError)
        assert((ex as Error).message.includes(KoidMsg.NotValidEpoch))
      }
    })
  })


  describe('should waitTillNextMillisecond() work', () => {
    it('normal', () => {
      const start = Date.now()
      const times = waitTillNextMillisecond(start)
      assert(times > 0)
      console.log('loop times', times)
    })

    it('return zero', () => {
      const start = Date.now()
      let times = waitTillNextMillisecond(start, 0)
      assert(times === 0)

      times = waitTillNextMillisecond(start, -1)
      assert(times === 0)
    })
  })
})


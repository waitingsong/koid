/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable node/no-extraneous-require */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { ConfigDc, ConfigId, genConfigRandom } from '../src/index'
import { parseConfig } from '../src/lib/helper'


const assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('should parseConfig() works', () => {
    it('perfer using ConfigDc', () => {
      const dataCenter = 2
      const worker = 3
      const config: ConfigDc | ConfigId = {
        id: 1,
        dataCenter,
        worker,
      }
      const ret = parseConfig(config)
      assert(ret.epoch === 0)
      const genId = (dataCenter << 5) + worker
      assert(ret.genId === genId << 12)
    })

    it('dataCenter overflow', () => {
      const dataCenter = 132
      const worker = 0
      const config: ConfigDc = {
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
      const config: ConfigDc = {
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
      const config: ConfigDc = {
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
      const ret = genConfigRandom()
      assert(ret.genId > 0)
      assert(ret.epoch === 0)
    })
  })

})


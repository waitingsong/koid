import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { ConfigDc, ConfigId } from '../src/index'
import { parseConfig, genConfigRandom } from '../src/lib/helper'


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
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

    it('genConfigRandom()', () => {
      const ret = genConfigRandom()
      assert(ret.genId > 0)
      assert(ret.epoch === 0)
    })
  })

})


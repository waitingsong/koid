import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { KoidFactory } from '../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
    it('generate', () => {
      const inst = KoidFactory({ id: 1 })
      const buf = inst.next
      const id = buf.readBigInt64BE()
      assert(id > 0)
    })
  })

})


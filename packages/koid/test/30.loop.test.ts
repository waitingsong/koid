import { lookup } from 'dns'

import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { KoidFactory } from '../src'
import { parseConfig } from '../src/lib/helper'
import { Koid } from '../src/lib/koid'


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
    it('unique ids when 5k', () => {
      const dataCenter = 2
      const worker = 3
      const config = {
        dataCenter,
        worker,
      }
      const koid = KoidFactory(config)
      testLoop(koid, 5000)
    })

    it('error when 90k', () => {
      const dataCenter = 2
      const worker = 3
      const config = {
        dataCenter,
        worker,
      }
      const koid = KoidFactory(config)
      try {
        testLoop(koid, 90000)
      }
      catch (ex) {
        return
      }
      assert(false, 'Should throw error, but not')
    })
  })

})


function testLoop(generator: Koid, howMany: number): void {
  for (let i = 0; i < howMany; i++) {
    generator.next
  }
}


import { lookup } from 'dns'

import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { KoidFactory, KoidMsg } from '../src'
import { parseConfig } from '../src/lib/helper'
import { Koid } from '../src/lib/koid'


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
    it('Clock backwards', () => {
      const dataCenter = 2
      const worker = 3
      const config = {
        dataCenter,
        worker,
      }
      const koid = KoidFactory(config)
      try {
        testLoopClock(koid, 10000000)
      }
      catch (ex) {
        assert(ex && (ex as Error).message.includes(KoidMsg.ClockBack))
        return
      }
      assert(false, 'Should throw error, but not')
    })

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

    it('error when 10M', () => {
      const dataCenter = 2
      const worker = 3
      const config = {
        dataCenter,
        worker,
      }
      const koid = KoidFactory(config)
      try {
        testLoop(koid, 10000000)
      }
      catch (ex) {
        assert(ex && (ex as Error).message.includes(KoidMsg.SeqExceed))
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


function testLoopClock(generator: Koid, howMany: number): void {
  const { epoch } = generator.config
  for (let i = 0; i < howMany; i++) {
    if (i > 10) {
      // @ts-expect-error
      generator.epoch = epoch + 1000000
    }
    try {
      generator.next
    }
    catch (ex) {
      if (ex && (ex as Error).message.includes(KoidMsg.SeqExceed)) {
        continue
      }
      throw ex
    }
  }
}


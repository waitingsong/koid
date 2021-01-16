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
        testLoopClock(koid, 100)
      }
      catch (ex) {
        assert(ex && (ex as Error).message.includes(KoidMsg.ClockBack))
        return
      }
      assert(false, 'Should throw error, but not')
    })

    it('error', () => {
      const dataCenter = 2
      const worker = 3
      const config = {
        dataCenter,
        worker,
      }
      const koid = KoidFactory(config)
      try {
        testLoopMock(koid, 20000)
      }
      catch (ex) {
        assert(ex && (ex as Error).message.includes(KoidMsg.SeqExceed))
        return
      }
      assert(false, 'Should throw error, but not')
    })
  })

})


function testLoopMock(generator: Koid, howMany: number): void {
  const { epoch } = generator.config

  for (let i = 0; i < howMany; i++) {
    try {
      // @ts-expect-error
      generator.lastTime = Date.now() - epoch
      generator.next
    }
    catch (ex) {
      if ((ex as Error).message.includes(KoidMsg.ClockBack)) {
        console.info('clock')
        continue
      }
      console.info('error loop:', i)
      // assert(i === 4096)
      throw ex
    }
  }
}


function testLoopClock(generator: Koid, howMany: number): void {
  const { epoch } = generator.config
  for (let i = 0; i < howMany; i++) {
    if (i > 1) {
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


/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable node/no-extraneous-require */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { Config, KoidFactory, KoidMsg } from '../src'
import { Koid } from '../src/lib/koid'


const assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
    it('Clock backwards no wait', () => {
      const dataCenter = 2
      const worker = 3
      const config: Config = {
        dataCenter,
        worker,
        noWait: true,
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

    it('Clock backwards wait', () => {
      const dataCenter = 2
      const worker = 3
      const config = {
        dataCenter,
        worker,
        noWait: false,
      }
      KoidFactory(config)
    })

    it('error nowait', () => {
      const dataCenter = 2
      const worker = 3
      const config: Config = {
        dataCenter,
        worker,
        noWait: true,
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

    it('error wait', () => {
      const dataCenter = 2
      const worker = 3
      const config = {
        dataCenter,
        worker,
        noWait: false,
      }
      KoidFactory(config)
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


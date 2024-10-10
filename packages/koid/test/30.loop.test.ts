import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import type { Config } from '../src/index.js'
import { KoidFactory, KoidMsg } from '../src/index.js'
import type { Koid } from '../src/lib/koid.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
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
        testLoopClock(koid, 200)
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
        testLoopMock(koid, 40000)
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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      generator.next
    }
    catch (ex) {
      if ((ex as Error).message.includes(KoidMsg.ClockBack)) {
        console.info('clock')
        continue
      }
      console.error('testLoopMock() error loop:', i)
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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      generator.next
    }
    catch (ex) {
      if (ex && (ex as Error).message.includes(KoidMsg.SeqExceed)) {
        continue
      }
      console.error('testLoopClock() error loop:', i)
      throw ex
    }
  }
}


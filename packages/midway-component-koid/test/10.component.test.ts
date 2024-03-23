
import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { KoidComponent } from '##/index.js'
import { testConfig } from '#@/root.config.js'


describe(fileShortPath(import.meta.url), function () {
  describe('Should work', () => {
    it('idGenerator', async () => {
      const { container } = testConfig

      const svc = await container.getAsync(KoidComponent)
      assert(svc)

      const id = svc.idGenerator
      assert(id > 0)
    })

    it('nextHex', async () => {
      const { container } = testConfig

      const svc = await container.getAsync(KoidComponent)
      assert(svc)

      const hex = svc.nextHex
      assert(hex.length === 16)
    })

    it('retrieveFromId()', async () => {
      const { container } = testConfig

      const svc = await container.getAsync(KoidComponent)
      assert(svc)

      const hex = svc.nextHex
      assert(hex.length === 16)

      const info = svc.retrieveFromId(hex)
      assert(info)
      console.log({ info })
      assert(info.dataCenter >= 0)
      assert(info.hex === hex)
      assert(info.sequence >= 0)
      assert(info.timestamp > 0)
      assert(info.worker >= 0)
    })

  })

})


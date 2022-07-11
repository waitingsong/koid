import assert from 'node:assert/strict'
import { relative } from 'node:path'

import { testConfig } from '@/root.config'
import { KoidComponent } from '~/index'


const filename = relative(process.cwd(), __filename).replace(/\\/ug, '/')

describe(filename, () => {
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


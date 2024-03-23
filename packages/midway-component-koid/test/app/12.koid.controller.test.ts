
import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { KoidComponent } from '##/index.js'
import { ConfigKey } from '##/lib/types.js'
import { testConfig } from '#@/root.config.js'


describe(fileShortPath(import.meta.url), function () {
  describe('enabled', () => {
    beforeEach(async () => {
      const { container } = testConfig
      const svc = await container.getAsync(KoidComponent)
      svc.config.enableDefaultRoute = true
    })

    it(`Should work /_${ConfigKey.namespace}/id`, async () => {
      const { httpRequest } = testConfig
      const path = `/_${ConfigKey.namespace}/id`

      const resp = await httpRequest
        .get(path)
        .expect(200)

      const ret = resp.text
      assert(! ret.includes(path), ret)
      // epoch 0 -> "6969675467472781312"
      // 354460608368902144
      // 354460755983171584
      assert(ret.length === 18, ret)
    })

    it(`Should work /_${ConfigKey.namespace}/hex`, async () => {
      const { httpRequest } = testConfig
      const path = `/_${ConfigKey.namespace}/hex`

      const resp = await httpRequest
        .get(path)
        .expect(200)

      const ret = resp.text
      assert(! ret.includes(path), ret)
      assert(ret.length === 16) // "60b942f2c5784000"
    })
  })

  describe('disabled', () => {
    beforeEach(async () => {
      const { container } = testConfig
      const svc = await container.getAsync(KoidComponent)
      svc.config.enableDefaultRoute = false
    })

    it(`Should work /_${ConfigKey.namespace}/id`, async () => {
      const { httpRequest } = testConfig
      const path = `/_${ConfigKey.namespace}/id`

      const resp = await httpRequest
        .get(path)
        .expect(500)

      const ret = resp.text
      assert(! ret.includes(path), ret)
      assert(ret.includes('not enabled'))
    })

    it(`Should work /_${ConfigKey.namespace}/hex`, async () => {
      const { httpRequest } = testConfig
      const path = `/_${ConfigKey.namespace}/hex`

      const resp = await httpRequest
        .get(path)
        .expect(500)

      const ret = resp.text
      assert(! ret.includes(path), ret)
      assert(ret.includes('not enabled'))
    })
  })
})


import assert from 'node:assert/strict'
import { relative } from 'node:path'

import { testConfig } from '@/root.config'
import { KoidComponent } from '~/index'


const filename = relative(process.cwd(), __filename).replace(/\\/ug, '/')

describe(filename, () => {
  describe('enabled', () => {
    beforeEach(async () => {
      const { container } = testConfig
      const svc = await container.getAsync(KoidComponent)
      svc.config.enableDefaultRoute = true
    })

    it('Should work /koid/id', async () => {
      const { httpRequest } = testConfig
      const path = '/koid/id'

      const resp = await httpRequest
        .get(path)
        .expect(200)

      const ret = resp.text as string
      // epoch 0 -> "6969675467472781312"
      // 354460608368902144
      // 354460755983171584
      assert(ret.length === 18, ret)
    })

    it('Should work /koid/hex', async () => {
      const { httpRequest } = testConfig
      const path = '/koid/hex'

      const resp = await httpRequest
        .get(path)
        .expect(200)

      const ret = resp.text as string
      assert(ret.length === 16) // "60b942f2c5784000"
    })
  })

  describe('disabled', () => {
    beforeEach(async () => {
      const { container } = testConfig
      const svc = await container.getAsync(KoidComponent)
      svc.config.enableDefaultRoute = false
    })

    it('Should work /koid/id', async () => {
      const { httpRequest } = testConfig
      const path = '/koid/id'

      const resp = await httpRequest
        .get(path)
        .expect(500)

      const ret = resp.text as string
      assert(ret.includes('not enabled'))
    })

    it('Should work /koid/hex', async () => {
      const { httpRequest } = testConfig
      const path = '/koid/hex'

      const resp = await httpRequest
        .get(path)
        .expect(500)

      const ret = resp.text as string
      assert(ret.includes('not enabled'))
    })
  })
})


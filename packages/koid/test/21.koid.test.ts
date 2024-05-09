import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Config, KoidFactory, retrieveFromId } from '../src/index.js'


describe(fileShortPath(import.meta.url), () => {
  describe('should koid.nextHex work', () => {
    it('normal', () => {
      const inst = KoidFactory()
      const hex = inst.nextHex
      assert(hex.length === 16)
    })
  })
})


/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { basename } from '@waiting/shared-core'
import * as assert from 'power-assert'

import { parseConfig, initialConfig, pluginName, KoidEggConfig as PluginConfig, Koid } from '../../src/index'


const filename = basename(__filename)

describe(filename, () => {
  describe('Should util works', () => {
    it('normal', () => {
      const arr = [
        {
          agent: true,
          appWork: true,
          client: {
            debug: false,
          },
        },
        {
          agent: true,
          appWork: false,
          client: {
            debug: false,
          },
        },
        {
          appWork: true,
          client: {
            debug: false,
          },
        },
        {
          appWork: true,
        },
        {},
      ]

      // @ts-expect-error
      arr.forEach((pconfig: PluginConfig) => {
        const ret = parseConfig(pconfig)

        if (typeof pconfig.agent === 'undefined') {
          assert(ret.agent === initialConfig.agent)
        }
        else {
          assert(ret.agent === !! pconfig.agent)
        }

        if (typeof pconfig.appWork === 'undefined') {
          assert(ret.appWork === initialConfig.appWork)
        }
        else {
          assert(ret.appWork === !! pconfig.appWork)
        }

        if (! pconfig.client) {
          assert(ret.client.debug === initialConfig.client.debug)
        }
        else {
          assert(ret.client.debug === pconfig.client.debug)
        }
      })



    })
  })
})


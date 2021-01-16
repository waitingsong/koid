import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { ConfigDc, KoidFactory, retrieveFromId } from '../src/index'
import { retrieveFromBuffer } from '../src/lib/util'


const filename = basename(__filename)

describe(filename, () => {
  describe('should retrieveFromId() works', () => {
    it('normal', () => {
      const config1: ConfigDc = {
        dataCenter: 0,
        worker: 0,
      }
      const config2: ConfigDc = {
        dataCenter: 7,
        worker: 30,
      }
      const config3: ConfigDc = {
        dataCenter: 31,
        worker: 31,
      };

      [config1, config2, config3].forEach((config) => {
        const time = Date.now()
        const koid = KoidFactory(config)

        const id = koid.next
        const int = id.readBigInt64BE()
        const hex = id.toString('hex')

        const infoBuf = retrieveFromId(id)
        const infoInt = retrieveFromId(int)
        const infoHex = retrieveFromId(hex)
        const infoHexPreifx = retrieveFromId('0x' + hex)

        console.info({
          id, int, hex, time, infoBuf,
        });
        [infoBuf, infoInt, infoHex, infoHexPreifx].forEach((info) => {
          assert(info.dataCenter === config.dataCenter, new Date(info.timestamp).toString())
          assert(info.worker === config.worker)
          assert(info.timestamp === time)
        })

      })
    })

    it('with invalid input', () => {
      [0, 7, 9].forEach((len) => {
        try {
          retrieveFromBuffer(Buffer.alloc(len))
        }
        catch (ex) {
          return
        }
        assert(false, `Should throw error, but not, with length: ${len}`)
      });

      ['', 'ffffffffffffff', '50dddcbfb5c0000W'].forEach((input) => {
        try {
          retrieveFromId(input)
        }
        catch (ex) {
          return
        }
        assert(false, `Should throw error, but not, with length: ${input}`)
      })
    })
  })

})

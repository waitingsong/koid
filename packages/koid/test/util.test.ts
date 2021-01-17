/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable node/no-extraneous-require */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { ConfigDc, KoidFactory, KoidMsg, retrieveFromId } from '../src/index'
import { isValidBigintStr, isValidHexString } from '../src/lib/util'


const assert = require('power-assert')


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
        const koid = KoidFactory(config)

        const time = Date.now()
        const id = koid.next
        const int = id.readBigInt64BE()
        const intStr = id.readBigInt64BE().toString()
        const hex = id.toString('hex')

        const infoBuf = retrieveFromId(id)
        const infoInt = retrieveFromId(int)
        const infoStr = retrieveFromId(intStr)
        const infoHex = retrieveFromId(hex)
        const infoHexPreifx = retrieveFromId('0x' + hex)

        console.info({
          id, int, hex, time, infoBuf,
        });
        [infoBuf, infoInt, infoHex, infoStr, infoHexPreifx].forEach((info) => {
          assert(info.dataCenter === config.dataCenter, new Date(info.timestamp).toString())
          assert(info.worker === config.worker)
          assert(info.timestamp === time || info.timestamp === time + 1)
        })
      })
    })

    it('with invalid input', () => {
      // [0, 7, 9].forEach((len) => {
      //   try {
      //     retrieveFromBuffer(Buffer.alloc(len))
      //   }
      //   catch (ex) {
      //     return
      //   }
      //   assert(false, `Should throw error, but not, with length: ${len}`)
      // });

      ['', '-123', '3FF', 'ffffffffffffff', '50dddcbfb5c0000W'].forEach((input) => {
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


  describe('should isValidBigintStr() works', () => {
    it('ex', () => {
      const arr = [
        '9223372036854775808',
        '9923372036854775808',
      ]
      arr.forEach((str) => {
        try {
          isValidBigintStr(str)
        }
        catch (ex) {
          if ((ex as TypeError).message.includes(KoidMsg.NotValidBigintString)) {
            return
          }
          throw ex
        }
        assert(false, `Should throw error, but not, with ${str}`)
      })
    })
  })


  describe('should isValidHexString() works', () => {
    it('ex', () => {
      const arr = [
        '0755455236955799552',
        '06755455236955799552',
      ]
      arr.forEach((str) => {
        assert(isValidHexString(str) === false)
      })
    })
  })
})


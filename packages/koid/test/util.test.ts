import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import type { Config, IdInfo } from '../src/index.js'
import { KoidFactory, KoidMsg, retrieveFromId } from '../src/index.js'
import { isValidBigintStr, isValidHexString, validEpoch } from '../src/lib/util.js'


describe(fileShortPath(import.meta.url), () => {
  describe('should retrieveFromId() work', () => {
    it('normal', () => {
      const config1: Config = {
        dataCenter: 0,
        worker: 0,
      }
      const config2: Config = {
        dataCenter: 7,
        worker: 30,
      }
      const config3: Config = {
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

        console.info({
          id, int, hex, time, config, infoBuf,
        })
        assert(infoBuf.dataCenter === config.dataCenter, infoBuf.timestamp.toString())
        assert(infoBuf.worker === config.worker)

        const infoInt = retrieveFromId(int)
        console.log({ infoInt })
        assert(infoInt.dataCenter === config.dataCenter, infoInt.timestamp.toString())
        assert(infoInt.worker === config.worker)

        const infoStr = retrieveFromId(intStr)
        console.log({ infoStr })
        assert(infoStr.dataCenter === config.dataCenter, infoStr.timestamp.toString())
        assert(infoStr.worker === config.worker)

        const infoHex = retrieveFromId(hex)
        console.log({ infoHex })
        assert(infoHex.dataCenter === config.dataCenter, infoHex.timestamp.toString())
        assert(infoHex.worker === config.worker)

        const infoHexPrefix = retrieveFromId('0x' + hex)
        console.log({ infoHexPrefix })
        assert(infoHexPrefix.dataCenter === config.dataCenter, infoHexPrefix.timestamp.toString())
        assert(infoHexPrefix.worker === config.worker)
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

      [
        '',
        '-123',
        '3FF',
        // 'ffffffffffffff',
        '50dddcbfb5c0000W',
      ].forEach((input) => {
        try {
          retrieveFromId(input)
        }
        catch (ex) {
          return
        }
        assert(false, `Should throw error, but not, with length: ${input}`)
      })
    })

    it('specify', () => {
      const arr = ['6755455236955799552']
      const expects: IdInfo[] = [
        {
          dataCenter: 6, worker: 24, timestamp: 1610626038779, sequence: 0, hex: '5dc032befecd8000',
        },
      ]

      arr.forEach((id, index) => {
        // 10111011100000000110010101111101111111011 00110 11000 000000000000
        const info = retrieveFromId(id)
        const expect = expects[index]!
        assert(info.dataCenter === expect.dataCenter)
        assert(info.worker === expect.worker)
      })
    })
  })


  describe('should isValidBigintStr() work', () => {
    it('normal', () => {
      const arr = [
        '77745618944',
        '185601803268653056',
      ]
      arr.forEach((str) => {
        const num = BigInt(str)
        const ret = isValidBigintStr(str)
        assert(typeof ret === 'bigint')
        assert(ret === num)
      })
    })

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


  describe('should isValidHexString() work', () => {
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


  describe('should validEpoch() work', () => {
    it('normal', () => {
      try {
        validEpoch(Date.now())
      }
      catch (ex) {
        assert(ex instanceof TypeError)
        assert((ex as Error).message.includes(KoidMsg.NotValidEpoch))
        return
      }
      assert(false, 'Should throw TypeError, but not')
    })
  })

})


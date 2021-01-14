/* eslint-disable node/no-unpublished-import */
import { KoidEggConfig, genConfigRandom } from '../../../../dist/index'


export const keys = '123456'

export const koid: KoidEggConfig = {
  client: {
    debug: false,
    koidConfig: genConfigRandom(), // value or void 0
  },
}


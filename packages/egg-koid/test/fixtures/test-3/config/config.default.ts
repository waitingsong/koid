/* eslint-disable node/no-unpublished-import */
import { KoidEggConfig } from '../../../../dist/index'


export const keys = '123456'

export const koid: KoidEggConfig = {
  client: {
    debug: false,
    koidConfig: {
      dataCenter: 33,
      worker: 33,
    },
  },
}


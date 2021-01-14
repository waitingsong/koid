import { genConfigRandom } from 'koid'

import { KoidEggConfig, ClientOptions } from './types'


export const pluginName = 'koid'
export const middlewareName = 'koid'

export const initialClientOptions: Readonly<ClientOptions> = {
  debug: false,
  koidConfig: genConfigRandom(),
}

export const initialConfig: Readonly<KoidEggConfig> = {
  appWork: true,
  agent: false,
  client: {
    debug: false,
    koidConfig: genConfigRandom(),
  },
}


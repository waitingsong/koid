import type { Koid } from 'koid'

import type { KoidEggConfig } from './types'


export * from './config'
export * from './util'
export {
  ClientOptions,
  KoidEggConfig,
} from './types'


declare module 'egg' {
  interface Application {
    koid: Koid
  }

  interface Agent {
    koid: Koid
  }

  interface EggAppConfig {
    koid: KoidEggConfig
  }
}


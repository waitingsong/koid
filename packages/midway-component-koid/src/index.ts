// @ts-ignore
import { PowerPartial } from '@midwayjs/core'

import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from './lib/index'


export { AutoConfiguration as Configuration } from './configuration'
export * from './lib/index'
export {
  ConfigDc,
  ConfigNode,
  KoidMsg,
  genConfigRandom,
} from 'koid'


declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    [ConfigKey.config]: PowerPartial<Config>
    [ConfigKey.middlewareConfig]: PowerPartial<MiddlewareConfig>
  }
}


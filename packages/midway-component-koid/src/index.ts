
import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from './lib/types'


export { AutoConfiguration as Configuration } from './configuration'
export * from './lib/index'
export * from './app/index.controller'

export {
  ConfigDc,
  ConfigNode,
  KoidMsg,
  genConfigRandom,
} from 'koid'


declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    [ConfigKey.config]: Partial<Config>
    [ConfigKey.middlewareConfig]: Partial<MiddlewareConfig>
  }
}


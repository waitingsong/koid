
import type {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from './lib/types.js'


export { AutoConfiguration as Configuration } from './configuration.js'
export * from './lib/index.js'
export * from './app/index.controller.js'

export {
  type ConfigDc,
  type ConfigNode,
  KoidMsg,
  genConfigRandom,
} from 'koid'


declare module '@midwayjs/core/dist/interface.js' {
  interface MidwayConfig {
    [ConfigKey.config]: Partial<Config>
    [ConfigKey.middlewareConfig]: Partial<MiddlewareConfig>
  }
}



import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from './lib/types.js'


export { AutoConfiguration as Configuration } from './configuration.js'
export * from './lib/index.js'
export * from './app/index.controller.js'

export {
  ConfigDc,
  ConfigNode,
  KoidMsg,
  genConfigRandom,
} from 'koid'


// @ts-expect-error
declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    [ConfigKey.config]: Partial<Config>
    [ConfigKey.middlewareConfig]: Partial<MiddlewareConfig>
  }
}


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


declare module '@midwayjs/core' {
  interface MidwayConfig {
    [ConfigKey.config]: Config
    [ConfigKey.middlewareConfig]: MiddlewareConfig
  }
}


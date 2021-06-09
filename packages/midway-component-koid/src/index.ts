/* eslint-disable import/no-extraneous-dependencies */
import type { Context } from 'egg'
import { Config } from 'koid'


export { AutoConfiguration as Configuration } from './configuration'
export * from './lib/index'


export {
  Config, ConfigDc, ConfigNode,
  KoidMsg, IdInfo,
  genConfigRandom,
} from 'koid'
export type { Koid } from 'koid'


declare module 'egg' {
  interface EggAppConfig {
    koid: Config
  }
}
declare const dummy: Context


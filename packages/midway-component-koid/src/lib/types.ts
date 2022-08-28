import { MiddlewareConfig as MWConfig } from '@waiting/shared-types'
import type { Config as _Config } from 'koid'


export type {
  IdInfo,
  Koid,
  KoidFactory,
} from 'koid'


export type Config = _Config & {
  /**
   * Enable route for `/koid/id` and `/koid/hex`
   * @default false
   */
  enableRoute?: boolean,
}

export interface MiddlewareOptions {
  debug: boolean
}
export type MiddlewareConfig = MWConfig<MiddlewareOptions>



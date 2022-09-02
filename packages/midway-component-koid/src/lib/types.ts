import { MiddlewareConfig as MWConfig } from '@waiting/shared-types'
import { Config as _Config } from 'koid'


export enum ConfigKey {
  namespace = 'koid',
  config = 'koidConfig',
  middlewareConfig = 'koidMiddlewareConfig',
  componentName = 'koidComponent',
  middlewareName = 'koidMiddleware'
}

// export enum Msg {
//   hello = 'hello koid',
// }

export type Config = _Config & {
  /**
   * Enable route for `/koid/id` and `/koid/hex`
   * @default false
   */
  enableDefaultRoute?: boolean,
}

export interface MiddlewareOptions {
  debug: boolean
}
export type MiddlewareConfig = MWConfig<MiddlewareOptions>


import { genConfigRandom } from 'koid'

import {
  Config,
  MiddlewareConfig,
  MiddlewareOptions,
} from './types'


const _config: Readonly<Config> = genConfigRandom()
export const initialConfig: Readonly<Config> = {
  enableRoute: false,
  ..._config,
}

export const initMiddlewareOptions: MiddlewareOptions = {
  debug: false,
}
export const initialMiddlewareConfig: Readonly<Omit<MiddlewareConfig, 'ignore' | 'match' | 'options'>> = {
  enableMiddleware: true,
}

export enum ConfigKey {
  namespace = 'koid',
  config = 'koidConfig',
  middlewareConfig = 'koidMiddlewareConfig',
  componentName = 'koidComponent',
  middlewareName = 'koidMiddleware'
}



import { genConfigRandom } from 'koid'

import {
  Config,
  MiddlewareConfig,
  MiddlewareOptions,
} from './types'


export const initialConfig: Readonly<Config> = genConfigRandom()

export const initMiddlewareOptions: MiddlewareOptions = {
  debug: false,
}
export const initialMiddlewareConfig: Readonly<Omit<MiddlewareConfig, 'ignore' | 'match' | 'options'>> = {
  enableMiddleware: true,
}

export const enum ConfigKey {
  namespace = 'koid',
  config = 'koidConfig',
  middlewareConfig = 'koidMiddlewareConfig',
  componentName = 'koidComponent',
  middlewareName = 'koidMiddleware'
}



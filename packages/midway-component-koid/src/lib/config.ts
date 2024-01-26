import { genConfigRandom } from 'koid'

import {
  Config,
  MiddlewareConfig,
  MiddlewareOptions,
} from './types.js'


// '2020-01-01T00:00:00Z'
const epoch = 1577836800000
const _config: Readonly<Config> = genConfigRandom(epoch)
export const initialConfig: Readonly<Config> = {
  enableDefaultRoute: true,
  ..._config,
}

export const initMiddlewareOptions: MiddlewareOptions = {
  debug: false,
}
export const initialMiddlewareConfig: Readonly<Omit<MiddlewareConfig, 'ignore' | 'match' | 'options'>> = {
  enableMiddleware: true,
}


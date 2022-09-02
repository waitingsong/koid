import {
  initialConfig,
  initialMiddlewareConfig,
  initMiddlewareOptions,
} from '../lib/config'
import { Config, MiddlewareConfig } from '../lib/types'


export const koa = {
  port: 7001,
}

export const koidConfig: Config = {
  ...initialConfig,
}

export const koidMiddlewareConfig: Readonly<Omit<MiddlewareConfig, 'match'>> = {
  ...initialMiddlewareConfig,
  ignore: [],
  options: {
    ...initMiddlewareOptions,
  },
}

import {
  initMiddlewareOptions,
  initialConfig,
  initialMiddlewareConfig,
} from '##/lib/config.js'
import type { Config, MiddlewareConfig } from '##/lib/types.js'


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

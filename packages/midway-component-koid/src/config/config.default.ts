import {
  initialConfig,
  initialMiddlewareConfig,
  initMiddlewareOptions,
} from '##/lib/config.js'
import { Config, MiddlewareConfig } from '##/lib/types.js'


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

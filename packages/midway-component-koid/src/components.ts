import * as koa from '@midwayjs/koa'
// import * as prometheus from '@midwayjs/prometheus'
import * as validate from '@midwayjs/validate'
// import * as aliOss from '@mwcp/ali-oss'
// import * as fetch from '@mwcp/fetch'
// import * as jaeger from '@mwcp/jaeger'
import * as jwt from '@mwcp/jwt'
// import * as db from '@mwcp/kmore'
// import * as koid from '@mwcp/koid'
// import { customLogger } from './util/custom-logger'


export const useComponents: IComponentInfo[] = [
  koa,
  validate,
  // jaeger,
  // prometheus,
  jwt,
  // koid,
  // fetch,
  // db,
  // aliOss,
]

export const useDefaultRoutes: (string | RegExp)[] = [
  // new RegExp(`/${aliOss.AliOssConfigKey.namespace}/.+`, 'u'),
  // new RegExp(`/${db.ConfigKey.namespace}/.+`, 'u'),
  // new RegExp(`/${jaeger.TracerConfigKey.namespace}/.+`, 'u'),
  // new RegExp(`/${koid.KoidConfigKey.namespace}/.+`, 'u'),
]

export interface IComponentInfo {
  Configuration: unknown
  [key: string]: unknown
}


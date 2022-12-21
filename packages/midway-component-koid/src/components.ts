import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'


export const useComponents: IComponentInfo[] = [
  koa,
  validate,
]

export const useDefaultRoutes: (string | RegExp)[] = []

export interface IComponentInfo {
  Configuration: unknown
  [key: string]: unknown
}


import * as koa from '@midwayjs/koa'


export const useComponents: IComponentInfo[] = [koa]

export const useDefaultRoutes: (string | RegExp)[] = []

export interface IComponentInfo {
  Configuration: unknown
  [key: string]: unknown
}


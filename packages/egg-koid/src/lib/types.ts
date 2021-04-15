/* eslint-disable node/no-unpublished-import */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Context } from 'egg'
import type { Config } from 'koid'


export interface KoidEggConfig {
  /**
   * Switch for app works, Default: true.
   */
  appWork?: boolean
  /**
   * Switch for agent, Default: false.
   */
  agent?: boolean
  client: ClientOptions
}

export interface ClientOptions {
  debug?: boolean
  koidConfig: Config | undefined
}


export type MiddlewarePathPattern = string | RegExp | PathPatternFunc | (string | RegExp | PathPatternFunc)[]
export type PathPatternFunc = (ctx: Context) => boolean
export type RedirectURL = string
export type passthroughCallback = (ctx: Context) => Promise<boolean | RedirectURL>

export type EggMiddleware = (ctx: Context, next: () => Promise<void>) => Promise<void>


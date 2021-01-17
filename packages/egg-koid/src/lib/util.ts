import assert from 'assert'

import {
  initialConfig,
  initialClientOptions,
} from './config'
import {
  KoidEggConfig,
  ClientOptions,
} from './types'


/** Generate Config with input and default value */
export function parseConfig(input: KoidEggConfig): KoidEggConfig {
  const config = {
    agent: initialConfig.agent,
    client: parseOptions(input.client),
    // enable: initialConfig.enable,
  } as KoidEggConfig

  /* istanbul ignore else */
  if (typeof input.agent === 'boolean') {
    config.agent = input.agent
  }

  /* istanbul ignore else */
  // if (typeof input.enable === 'boolean') {
  //   config.enable = input.enable
  // }

  /* istanbul ignore else */
  // if (typeof input.ignore !== 'undefined') {
  //   config.ignore = input.ignore
  // }

  /* istanbul ignore else */
  // if (typeof input.match !== 'undefined') {
  //   config.match = input.match
  // }

  config.appWork = typeof input.appWork === 'boolean'
    ? input.appWork
    : initialConfig.appWork

  // config.appMiddlewareIndex = typeof input.appMiddlewareIndex === 'number'
  //   ? input.appMiddlewareIndex
  //   : initialConfig.appMiddlewareIndex

  return config
}

/** Generate Options with input and default value */
export function parseOptions(client?: ClientOptions): ClientOptions {
  const opts = {} as ClientOptions

  if (client) {
    opts.debug = !! client.debug
    opts.koidConfig = client.koidConfig
  }
  else {
    opts.debug = initialClientOptions.debug
  }

  assert(opts)
  return opts
}


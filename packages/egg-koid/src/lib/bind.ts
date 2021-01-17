/* istanbul ignore file */
import assert from 'assert'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Agent, Application } from 'egg'
import { KoidFactory, Koid } from 'koid'

import { pluginName } from './config'
import { ClientOptions } from './types'
import { parseOptions } from './util'


export function bindJwtOnAppOrAgent(app: Application | Agent): void {
  app.addSingleton(pluginName, createOneClient)
}

function createOneClient(options: ClientOptions, app: Application | Agent): Koid {
  const opts: ClientOptions = parseOptions(options)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  assert(opts && Object.keys(opts).length, `[egg-${pluginName}] config empty`)

  const client = KoidFactory(opts.koidConfig)
  app.coreLogger.info(`[egg-${pluginName}] instance status OK`)

  return client
}


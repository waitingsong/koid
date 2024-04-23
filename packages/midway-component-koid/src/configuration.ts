/* eslint-disable import/max-dependencies */
// import assert from 'node:assert'

import {
  Configuration,
  ILifeCycle,
  ILogger,
  Inject,
  Logger,
  MidwayWebRouterService,
} from '@midwayjs/core'
import { TraceInit } from '@mwcp/otel'
import { IMidwayContainer, MConfig, deleteRouter } from '@mwcp/share'

import * as DefaultConfig from './config/config.default.js'
import * as LocalConfig from './config/config.local.js'
import * as UnittestConfig from './config/config.unittest.js'
import { useComponents } from './imports.js'
import { ConfigKey, Config } from './lib/types.js'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [
    {
      default: DefaultConfig,
      local: LocalConfig,
      unittest: UnittestConfig,
    },
  ],
  imports: useComponents,
})
export class AutoConfiguration implements ILifeCycle {

  @Logger() protected readonly logger: ILogger

  @MConfig(ConfigKey.config) protected readonly config: Config

  @Inject() protected readonly webRouterService: MidwayWebRouterService

  async onConfigLoad(): Promise<void> {
    if (! this.config.enableDefaultRoute) {
      await deleteRouter(`/_${ConfigKey.namespace}`, this.webRouterService)
    }
  }

  @TraceInit({ namespace: ConfigKey.namespace })
  async onReady(container: IMidwayContainer): Promise<void> {
    void container

    this.logger.info(`[${ConfigKey.componentName}]: ${JSON.stringify(this.config)}`)
    this.logger.info(`[${ConfigKey.componentName}] onReady`)
  }

}


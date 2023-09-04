/* eslint-disable import/max-dependencies */
// import assert from 'node:assert'

import {
  Configuration,
  ILifeCycle,
  ILogger,
  Logger,
} from '@midwayjs/core'
import { IMidwayContainer } from '@mwcp/share'

import * as DefulatConfig from './config/config.default.js'
// import * as LocalConfig from './config/config.local.js'
import * as UnittestConfig from './config/config.unittest.js'
import { useComponents } from './imports.js'
import { ConfigKey } from './lib/types.js'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [
    {
      default: DefulatConfig,
      // local: LocalConfig,
      unittest: UnittestConfig,
    },
  ],
  imports: useComponents,
})
export class AutoConfiguration implements ILifeCycle {

  @Logger() protected readonly logger: ILogger

  async onReady(container: IMidwayContainer): Promise<void> {
    void container

    this.logger.info(`[${ConfigKey.componentName}] onReady`)
  }

}


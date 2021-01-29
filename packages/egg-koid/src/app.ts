// eslint-disable-next-line import/no-extraneous-dependencies
import { Application } from 'egg'

import { bindOnAppOrAgent } from './lib/bind'
import { pluginName } from './lib/config'
import { KoidEggConfig } from './lib/types'
import { parseConfig } from './lib/util'


/* istanbul ignore next */
export default (app: Application): void => {
  const config: KoidEggConfig = parseConfig(app.config[pluginName])

  app.config[pluginName].appWork = config.appWork

  /* istanbul ignore else */
  if (config.appWork) {
    bindOnAppOrAgent(app)
  }
}


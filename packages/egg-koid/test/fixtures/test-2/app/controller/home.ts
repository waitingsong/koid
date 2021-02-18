/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable node/no-unpublished-import */
import { Controller } from 'egg'
import type { PluginInfo } from 'egg-core'

import { pluginName } from '../../../../../dist/lib/config'


export default class HomeController extends Controller {

  index(): void {
    this.ctx.body = this._hello()
  }

  ping(): void {
    this.ctx.body = this._hello()
  }

  _hello(): string {
    const plugin: PluginInfo | undefined = this.app.plugins[pluginName]
    return `hi, ${plugin ? plugin.name : ''}`
  }

}


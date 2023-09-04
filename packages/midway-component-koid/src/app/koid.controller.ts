import {
  Config as _Config,
  Controller,
  Get,
  Inject,
} from '@midwayjs/core'

import { KoidComponent } from '##/lib/koid.component.js'
import { Config, ConfigKey, Msg } from '##/lib/types.js'


@Controller(`/_${ConfigKey.namespace}`)
// @Controller(`/${ConfigKey.namespace}`)
export class KoidController {

  @Inject() readonly koid: KoidComponent

  @_Config(ConfigKey.config) readonly config: Config

  @Get('/hello')
  hello(): string {
    this.valiateRoute()
    return Msg.hello
  }


  @Get('/id')
  id(): string {
    this.valiateRoute()
    return this.koid.idGenerator.toString()
  }

  @Get('/hex')
  hex(): string {
    this.valiateRoute()
    return this.koid.nextHex
  }

  valiateRoute(): void {
    if (! this.config.enableDefaultRoute) {
      throw new Error('Koid route is not enabled')
    }
  }

}


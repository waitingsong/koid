import {
  Config as _Config,
  Controller,
  Get,
  Inject,
} from '@midwayjs/decorator'
import { KoidMsg as Msg } from 'koid'

import { KoidComponent } from '../lib/index'
import { Config, ConfigKey } from '../lib/types'


@Controller(`/${ConfigKey.namespace}`)
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


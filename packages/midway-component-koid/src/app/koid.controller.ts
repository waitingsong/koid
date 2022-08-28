import {
  Controller,
  Get,
  Inject,
} from '@midwayjs/decorator'

import { KoidComponent } from '../lib/index'


@Controller('/koid')
export class KoidController {

  @Inject() readonly koid: KoidComponent


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
    if (! this.koid.enableRoute) {
      throw new Error('Koid route is not enabled')
    }
  }

}


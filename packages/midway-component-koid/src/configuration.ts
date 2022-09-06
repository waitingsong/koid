import 'tsconfig-paths/register'

import { join } from 'node:path'

import { Configuration } from '@midwayjs/decorator'
import * as koa from '@midwayjs/koa'

import { ConfigKey } from './lib/types'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [join(__dirname, 'config')],
  imports: [koa],
})
export class AutoConfiguration {
}



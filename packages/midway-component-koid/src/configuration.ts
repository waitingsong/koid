import 'tsconfig-paths/register'

import { join } from 'node:path'

import { Configuration } from '@midwayjs/decorator'

import { ConfigKey } from './lib/types'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [join(__dirname, 'config')],
})
export class AutoConfiguration {
}



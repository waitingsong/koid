import 'tsconfig-paths/register'

import { join } from 'node:path'

import { ILifeCycle } from '@midwayjs/core'
import { Configuration } from '@midwayjs/decorator'

import { useComponents } from './components'
import { ConfigKey } from './lib/types'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [join(__dirname, 'config')],
  imports: useComponents,
})
export class AutoConfiguration implements ILifeCycle {
}


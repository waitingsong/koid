import 'tsconfig-paths/register'

import { join } from 'node:path'

import { Configuration, ILifeCycle } from '@midwayjs/core'

import { useComponents } from './components'
import { ConfigKey } from './lib/types'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [join(__dirname, 'config')],
  imports: useComponents,
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AutoConfiguration implements ILifeCycle {
  // @App() readonly app: Application
  // async onReady(): Promise<void> {
  // }
}


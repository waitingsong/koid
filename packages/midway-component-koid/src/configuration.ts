import 'tsconfig-paths/register'

import { join } from 'node:path'

import { ILifeCycle } from '@midwayjs/core'
import { App, Configuration } from '@midwayjs/decorator'
import { Application } from '@mwcp/share'

import { useComponents } from './components'
import { ConfigKey } from './lib/types'
import {
  ErrorHandlerMiddleware,
  ResponseHeadersMiddleware,
} from './middleware/index.middleware'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [join(__dirname, 'config')],
  imports: useComponents,
})
export class AutoConfiguration implements ILifeCycle {
  @App() readonly app: Application
  async onReady(): Promise<void> {

    // 定制化日志
    // customLogger(this.logger, this.app)

    // 全局x-request-id处理中间件
    // @ts-ignore
    // this.app.getMiddleware().insertFirst(RequestIdMiddleware)

    // 全局错误处理中间件（确保在最前）
    // @ts-ignore
    this.app.getMiddleware().insertFirst(ErrorHandlerMiddleware)

    const mws = [
      // ResponseMimeMiddleware,
      ResponseHeadersMiddleware,
    ]
    // @ts-ignore
    this.app.useMiddleware(mws)

  }
}


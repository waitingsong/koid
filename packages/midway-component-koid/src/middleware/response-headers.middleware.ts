import { Middleware } from '@midwayjs/decorator'
import {
  Context,
  IMiddleware,
  NextFunction,
} from '@mwcp/share'


/**
 * 设置默认响应 ContentType
 */
@Middleware()
export class ResponseHeadersMiddleware implements IMiddleware<Context, NextFunction> {

  static getName(): string {
    const name = 'responseHeadersMiddleware'
    return name
  }

  match(ctx?: Context) {
    const flag = !! ctx
    return flag
  }

  resolve() {
    return middleware
  }

}


async function middleware(
  ctx: Context,
  next: NextFunction,
): Promise<void> {

  void ctx
  await next()

}


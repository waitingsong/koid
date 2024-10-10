import {
  Autoload,
  Init,
  Singleton,
} from '@midwayjs/core'
import { TraceInit } from '@mwcp/otel'
import { MConfig } from '@mwcp/share'
import { IdInfo, Koid, KoidFactory, retrieveFromId } from 'koid'

import {
  Config,
  ConfigKey,
} from './types.js'


@Autoload()
@Singleton()
export class KoidComponent {

  @MConfig(ConfigKey.config) readonly config: Config

  protected koid: Koid

  @Init()
  async init(): Promise<void> {
    await this._init(this.config)
  }

  /**
   * SnowFlake id Generator
   */
  get idGenerator(): bigint {
    return this.koid.nextBigint
  }

  get nextHex(): string {
    return this.koid.next.toString('hex')
  }

  retrieveFromId(id: bigint | string | Readonly<Buffer>, epoch?: number): IdInfo {
    const epoch2 = typeof epoch === 'number' ? epoch : this.config.epoch
    return retrieveFromId(id, epoch2)
  }

  // #region protected

  @TraceInit<KoidComponent['_init']>({
    namespace: ConfigKey.componentName,
    after: ([config]) => {
      const attrs = {
        [ConfigKey.config]: JSON.stringify(config),
      }
      return { attrs }
    },
  })
  protected async _init(config: Config): Promise<void> {
    this.koid = KoidFactory(config)
  }

}


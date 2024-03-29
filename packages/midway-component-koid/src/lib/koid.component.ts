import {
  Autoload,
  Config as _Config,
  Init,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/core'
import {
  Span,
  TraceInit,
} from '@mwcp/otel'
import { IdInfo, Koid, KoidFactory, retrieveFromId } from 'koid'

import {
  ConfigKey,
  Config,
} from './types.js'


@Autoload()
@Provide()
@Scope(ScopeEnum.Singleton)
export class KoidComponent {

  @_Config(ConfigKey.config) readonly config: Config

  protected koid: Koid

  @Init()
  async init(): Promise<void> {
    await this._init(this.config)
  }

  @TraceInit({ namespace: ConfigKey.componentName })
  protected async _init(config: Config, span?: Span): Promise<void> {
    if (span) {
      span.setAttribute('config', JSON.stringify(config))
    }
    this.koid = KoidFactory(config)
  }

  /**
   * SnowFlake id Generatoror
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

}


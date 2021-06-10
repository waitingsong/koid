/* eslint-disable import/no-extraneous-dependencies */
import {
  Config,
  Init,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/decorator'
import {
  Config as KoidConfig,
  IdInfo,
  Koid,
  KoidFactory,
  retrieveFromId,
} from 'koid'


@Provide()
@Scope(ScopeEnum.Singleton)
export class KoidComponent {

  @Config('koid') readonly config: KoidConfig

  protected koid: Koid

  @Init()
  async init(): Promise<void> {
    this.koid = KoidFactory(this.config)
  }

  /**
   * SnowFlake id Generatoror
   * @description do not call id.toString(16), will got wrong hex string
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


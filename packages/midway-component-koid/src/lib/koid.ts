/* eslint-disable import/no-extraneous-dependencies */
import {
  Config,
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

  private readonly koid: Koid

  constructor() {
    this.koid = KoidFactory(this.config)
  }

  /**
   * SnowFlake id Generatoror
   * @usage ```
   *  const id = this.idGenerator
   *  const strId = id.toString()
   *  const hexId = id.toString(16)
   *  const binId = id.toString(2)
   * ```
   */
  get idGenerator(): bigint {
    return this.koid.nextBigint
  }

  retrieveFromId(id: bigint | string | Readonly<Buffer>, epoch?: number): IdInfo {
    const epoch2 = typeof epoch === 'number' ? epoch : this.config.epoch
    return retrieveFromId(id, epoch2)
  }
}


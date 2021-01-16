import { parseConfig } from './helper'
import { Koid } from './koid'
import type { ConfigDc, ConfigId, Options } from './types'


export function KoidFactory(config?: ConfigDc | ConfigId): Koid {
  const opts: Options = parseConfig(config)
  const inst = new Koid(opts)
  return inst
}

export {
  ConfigId, ConfigDc,
}
// note: only export type of Koid, therefor use `import type { Koid } from 'koid'`
export type { Koid } from './koid'
export {
  KoidMsg, IdInfo,
} from './types'
export { genConfigRandom } from './helper'
export { retrieveFromId } from './util'


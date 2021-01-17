import { parseConfig } from './helper'
import { Koid } from './koid'
import type { Config, Options } from './types'


export function KoidFactory(config?: Config): Koid {
  const opts: Options = parseConfig(config)
  const inst = new Koid(opts)
  return inst
}

export { Config }
// Note: only export type of Koid, therefor use `import type { Koid } from 'koid'`
export type { Koid } from './koid'
export {
  ConfigDc, ConfigNode,
  KoidMsg, IdInfo,
} from './types'
export { genConfigRandom } from './helper'
export { retrieveFromId } from './util'


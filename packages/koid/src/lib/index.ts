import { parseConfig } from './helper.js'
import { Koid } from './koid.js'
import type { Config, Options } from './types.js'


export function KoidFactory(config?: Config): Koid {
  const opts: Options = parseConfig(config)
  const inst = new Koid(opts)
  return inst
}

export { Config }
// Note: only export type of Koid, therefor use `import type { Koid } from 'koid'`
export type { Koid } from './koid.js'
export {
  ConfigDc, ConfigNode,
  KoidMsg, IdInfo,
} from './types.js'
export {
  genConfigRandom, waitTillNextMillisecond,
} from './helper.js'
export { retrieveFromId } from './util.js'


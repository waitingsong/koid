import { parseOptions } from './helper'
import { Koid } from './koid'
import type { ConfigDc, ConfigId, Options } from './types'


export function KoidFactory(config: ConfigId | ConfigDc): Koid {
  const opts: Options = parseOptions(config)
  const inst = new Koid(opts)
  return inst
}


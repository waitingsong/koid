import { parseConfig } from './helper'
import { Koid } from './koid'
import type { ConfigDc, ConfigId, Options } from './types'


export function KoidFactory(config?: ConfigDc | ConfigId): Koid {
  const opts: Options = parseConfig(config)
  const inst = new Koid(opts)
  return inst
}


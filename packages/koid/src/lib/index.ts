/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
import { parseOptions } from './helper'
import { Koid } from './koid'
import type { ConfigDc, ConfigId, Options } from './types'


/**
 * FlakeId Factory
 */
export function KoidFactory(options: ConfigId | ConfigDc): Koid {
  const opts: Options = parseOptions(options)
  const inst = new Koid(opts)
  return inst
}


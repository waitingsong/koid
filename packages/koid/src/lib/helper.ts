/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
import { ConfigDc, ConfigId, Options } from './types'


export function parseOptions(options: ConfigId | ConfigDc): Options {
  return 'id' in options
    ? parseConfigId(options)
    : parseConfigDc(options)
}


function parseConfigId(options: ConfigId): Options {
  const opts = {
    genId: (options.id & 0x3FF) << 12,
    epoch: typeof options.epoch === 'number' ? options.epoch : 0,
  }

  return opts
}

function parseConfigDc(options: ConfigDc): Options {
  const dataCenter = options.dataCenter & 0x1F
  const worker = options.worker & 0x1F

  const opts = {
    genId: (dataCenter << 5 | worker) << 12,
    epoch: typeof options.epoch === 'number' ? options.epoch : 0,
  }

  return opts
}


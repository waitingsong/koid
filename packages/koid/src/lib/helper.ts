/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
import { Config, ConfigDc, ConfigNode, Options } from './types'
import { validEpoch } from './util'


export function parseConfig(config?: Config): Options {
  /* istanbul ignore else */
  if (typeof config === 'undefined') {
    const dc = genConfigRandom()
    return parseConfigDc(dc)
  }

  if (typeof config.epoch !== 'undefined') {
    validEpoch(config.epoch)
  }

  if (typeof config.node === 'number') {
    const configNode: ConfigNode = {
      node: (config as ConfigNode).node,
      epoch: config.epoch,
      noWait: !! config.noWait,
    }
    return parseConfigNode(configNode)
  }
  else {
    const conf = config as ConfigDc
    const configDc: ConfigDc = {
      dataCenter: conf.dataCenter,
      worker: conf.worker,
      epoch: conf.epoch,
      noWait: !! config.noWait,
    }
    return parseConfigDc(configDc)
  }
}

/**
 * Generate random id
 */
export function genConfigRandom(epoch = 0): ConfigDc {
  const id = Date.now() + epoch & 0x3FF
  const config = parseConfigNode({ node: id })
  const ret: ConfigDc = {
    dataCenter: config.dataCenter,
    worker: config.worker,
    epoch,
    noWait: false,
  }
  return ret
}


function parseConfigDc(config: ConfigDc): Options {
  const dataCenter = config.dataCenter & 0x1F
  const worker = config.worker & 0x1F
  const id = (dataCenter << 5 | worker) & 0x3FF

  const opts: Options = {
    genId: id << 12,
    epoch: typeof config.epoch === 'number' ? config.epoch : 0,
    dataCenter,
    worker,
    noWait: !! config.noWait,
  }

  return opts
}

function parseConfigNode(config: ConfigNode): Options {
  const id = config.node & 0x3FF
  const dataCenter = id >> 5
  const worker = id & 0x1F

  const opts = {
    genId: id << 12,
    epoch: typeof config.epoch === 'number' ? config.epoch : 0,
    dataCenter,
    worker,
    noWait: !! config.noWait,
  }

  return opts
}


export function waitTillNextMillisecond(time: number, maxLoopTimes = 10240000): number {
  /* istanbul ignore next */
  if (maxLoopTimes <= 0) {
    return 0
  }

  for (let i = 0; i < Math.abs(maxLoopTimes); i += 1) {
    let now = Date.now()
    /* istanbul ignore next */
    if (now > time && i > 0) {
      return i
    }
    now = Number.MAX_SAFE_INTEGER * now
  }
  return 0
}

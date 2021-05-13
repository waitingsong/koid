/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */

export type Config = ConfigDc | ConfigNode

export interface ConfigNode {
  /**
   * Generator identifier. Values from 0 to 1023 (10 bit).
   * It can be provided instead of datacenter and worker identifiers.
   */
  node: number
  /**
   * Number used to reduce value of a generated timestamp,
   * Default: 0
   */
  epoch?: number
  dataCenter?: never
  worker?: never
  /**
   * @default false
   * @description wait until next available id if true when conflict
   */
  noWait?: boolean
}

export interface ConfigDc {
  /**
   * DataCenter identifier. It can have values from 0 to 31 (5 bit).
   */
  dataCenter: number
  /**
   * Worker identifier. It can have values from 0 to 31 (5 bit).
   */
  worker: number
  /**
   * Number used to reduce value of a generated timestamp,
   * Default: 0
   */
  epoch?: number
  node?: never
  /**
   * @default false
   * @description wait until next available id if true when conflict
   */
  noWait?: boolean
}

export interface Options {
  epoch: number
  genId: number
  dataCenter: number
  worker: number
  /**
   * @default false
   * @description wait until next available id if true when conflict
   */
  noWait: boolean
}

export enum KoidMsg {
  SeqExceed = 'Sequence exceeded its maximum value',
  ClockBack = 'Clock moved backwards',
  NotValidBigintId = 'Not an valid bigint id. Should gross then 0 and less equal then 9223372036854775807n',
  NotValidBigintString = 'Not an valid bigint string',
  NotValidHexString = 'Not an valid hex string',
  NotValidIdFormat = 'Not an valid id value'
}


export interface IdInfo {
  dataCenter: Options['dataCenter']
  worker: Options['worker']
  timestamp: number
  sequence: number
  /** hex id */
  hex: string
}


/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */

export interface ConfigId {
  /**
   * Generator identifier. Values from 0 to 1023 (10 bit).
   * It can be provided instead of datacenter and worker identifiers.
   */
  id: number
  /**
   * Number used to reduce value of a generated timestamp
   */
  epoch?: number
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
   * Number used to reduce value of a generated timestamp
   */
  epoch?: number
}

export interface Options {
  epoch: number
  genId: number
}


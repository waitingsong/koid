/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
import { Options } from './types'


export class Koid {

  private readonly POW10 = Math.pow(2, 10)

  private readonly POW26 = Math.pow(2, 26)

  private readonly epoch: number

  private readonly genId: number

  private readonly seqMask: number

  private lastTime: number

  private seq: number

  constructor(private readonly options: Options) {
    this.genId = options.genId
    this.epoch = options.epoch
    this.seqMask = 0xFFF
    this.lastTime = 0
    this.seq = 0
  }

  get next(): Buffer {
    const id = Buffer.alloc(8)
    const time = Date.now() - this.epoch

    // Generates id in the same millisecond as the previous id
    if (time < this.lastTime) {
      throw new Error(`Clock moved backwards. Refusing to generate id for ${this.lastTime - time} milliseconds`)
    }
    else if (time === this.lastTime) {
      this.seq = this.seq + 1 & this.seqMask
      // If all sequence values (4096 unique values including 0) have been used
      // to generate ids in the current millisecond

      // sequence counter exceeded its max value (4095)
      if (this.seq === 0) {
        throw new Error('Sequence exceeded its maximum value.')
      }
    }
    else {
      this.seq = 0
    }

    this.lastTime = time

    id.writeUInt32BE((time & 0x3) << 22 | this.genId | this.seq, 4)
    id.writeUInt8(Math.floor(time / 4) & 0xFF, 4)
    id.writeUInt16BE(Math.floor(time / this.POW10) & 0xFFFF, 2)
    id.writeUInt16BE(Math.floor(time / this.POW26) & 0xFFFF, 0)

    return id
  }


  get config(): Readonly<Options> {
    const ret = {
      ...this.options,
    }
    return ret
  }

}


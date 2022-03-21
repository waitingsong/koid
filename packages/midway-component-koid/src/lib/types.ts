import { MiddlewareConfig as MWConfig } from '@waiting/shared-types'


export {
  Config,
  IdInfo,
  Koid,
  KoidFactory,
  retrieveFromId,
} from 'koid'


export interface MiddlewareOptions {
  debug: boolean
}
export type MiddlewareConfig = MWConfig<MiddlewareOptions>



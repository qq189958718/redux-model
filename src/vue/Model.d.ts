import { BaseModel } from '../core/BaseModel';
import { HttpServiceWithMeta } from '../core/utils/types';
import { Ref, UseSelector } from './types';

export declare abstract class Model<Data = null> extends BaseModel<Data> {
  // @ts-ignore
  protected switchReduxSelector<TState = any, TSelected = any>(): UseSelector<TState, TSelected>;

  useData(): Ref<Data>;
  useData<T = Data>(filter: (data: Data) => T): Ref<T>;

  protected patch<Response>(uri: string): HttpServiceWithMeta<Data, Response, unknown>;
}

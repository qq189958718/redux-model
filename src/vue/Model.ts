import { BaseModel } from '../core/BaseModel';
import { HttpServiceWithMeta } from '../core/utils/types';
import { METHOD } from '../core/utils/method';
import { getStore } from '../core/utils/createReduxStore';
import { Ref, UseSelector } from './types';
import { computed } from './hooks';

export abstract class Model<Data = null> extends BaseModel<Data> {
  // @ts-ignore
  public useData<T = Data>(filter?: (data: Data) => T): Ref<T> {
    // @ts-ignore
    return super.useData(filter);
  }

  // @ts-ignore
  protected switchReduxSelector<TState = any, TSelected = any>(): UseSelector<TState, TSelected> {
    return (selector: (state: TState) => TSelected): Ref<TSelected> => {
      return computed(() => selector(getStore().getState()));
    };
  }

  protected patch<Response>(uri: string): HttpServiceWithMeta<Data, Response, unknown> {
    return this.serviceAction<Response>(uri, METHOD.patch);
  }
}

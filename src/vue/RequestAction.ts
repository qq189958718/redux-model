import { BaseRequestAction } from '../core/action/BaseRequestAction';
import { HttpServiceHandle } from '../core/service/HttpServiceHandle';
import { getStore } from '../core/utils/createReduxStore';
import { Ref, UseSelector } from './types';
import { computed } from './hooks';
import { Meta, Metas, MetasLoading } from '../core/utils/types';

export class RequestAction<Data, A extends (...args: any[]) => HttpServiceHandle<Data, Response, Payload, M>, Response, Payload, M> extends BaseRequestAction<Data, A, Response, Payload, M> {
  protected loadingsCacheObserver?: [Metas, Ref<MetasLoading<M>>];

  // @ts-ignore
  public useMeta<T extends keyof Meta>(key?: T): Ref<Meta> | Ref<Meta[T]> {
    // @ts-ignore
    return super.useMeta(key);
  }

  // @ts-ignore
  public useMetas<T extends keyof Meta>(value?: M, metaKey?: T): Ref<Metas<M>> | Ref<Meta[T]> {
    // @ts-ignore
    return super.useMetas(value, metaKey);
  }

  // @ts-ignore
  useLoading(): Ref<boolean> {
    // @ts-ignore
    return super.useLoading();
  }

  // @ts-ignore
  useLoadings(value?: M): Ref<boolean | MetasLoading<M>> {
    if (value !== undefined) {
      return this.useMetas(value, 'loading') as Ref<boolean>;
    }

    const metas = this.useMetas() as Ref<Metas<M>>;

    if (!this.loadingsCacheObserver || this.loadingsCacheObserver[0] !== metas.value) {
      // FIXME: no observer
      this.loadingsCacheObserver = [metas.value, {
        value: {
          pick: (payload) => {
            return metas.value.pick(payload).loading;
          }
        },
      }];
    }

    return this.loadingsCacheObserver[1];
  }

  // @ts-ignore
  protected switchReduxSelector<TState = any, TSelected = any>(): UseSelector<TState, TSelected> {
    return (selector: (state: TState) => TSelected): Ref<TSelected> => {
      return computed(() => selector(getStore().getState()));
    };
  }
}

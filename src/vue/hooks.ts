import Vue from 'vue';
import * as Api from '@vue/composition-api';

let compositionApi: typeof Api;

const isVue3 = Number(Vue.version.split('.')[0]) >= 3;

export const observable = (data: object) => {
  if (isVue3) {
    // TODO:
    throw new ReferenceError('Observable for vue3 is not implemented yet');
  } else if (compositionApi) {
    return compositionApi.reactive(data);
  } else {
    return Vue.observable(data);
  }
};

export const computed = <T>(fn: () => T) => {
  if (isVue3) {
    // TODO:
    throw new ReferenceError('Observable for vue3 is not implemented yet');
  } else if (compositionApi) {
    return compositionApi.computed(fn);
  }

  throw new ReferenceError('You are not allowed to use hooks method');
};

export const useCompositionApi = (api: typeof Api): void => {
  compositionApi = api;
};

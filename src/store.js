import Vue from 'vue';
import Vuex from 'vuex';

import settingsModule from '@/store/settingsModule';
import sessionModule from '@/store/sessionModule';
import textModule from '@/store/textModule';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    settings: settingsModule,
    session: sessionModule,
    text: textModule,
  },
  state: {
    error: null,
    textValue: null,
  },
  mutations: {
    error(state, error) {
      state.error = error;
    },
    textValue(state, value) {
      state.textValue = value;
    },
  },
  actions: {
    execute({
      commit,
      state,
    }, action) {
      const textValue = state.textValue;
      if (!textValue) {
        return;
      }

      try {
        const newValue = action.execute(textValue);
        commit('textValue', newValue);
        commit('calculatedValue', newValue);
      } catch (e) {
        console.error(e);
        commit('error', e);
      }
    },
  },
});

export default store;

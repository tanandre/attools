import Vue from 'vue'
import Vuex from 'vuex'

import settingsModule from './store/settingsModule'
import sessionModule from './store/sessionModule'

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		settings: settingsModule,
		session: sessionModule
	},
	state: {
		error: null,
    textValue: null,
	},
	mutations: {
		error (state, error) {
			state.error = error;
		},
    textValue (state, value) {
      state.textValue = value;
    }
	},
	actions: {}
});

export default store

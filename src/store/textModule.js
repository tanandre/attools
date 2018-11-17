const textModule = {
  state: {
    calculatedValue: null,
  },
  mutations: {
    calculatedValue(state, value) {
      state.calculatedValue = value
    }
  }
};

export default textModule;
export default {
  changeData(state, data) {
    state[data.name] = data.val;
    return state[data.name];
  }
};

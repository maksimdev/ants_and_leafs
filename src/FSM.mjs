export default class FSM {
  activeState = null;

  setState(state) {
    this.activeState = state;
  }

  update() {
    if (this.activeState) this.activeState();
  }
};
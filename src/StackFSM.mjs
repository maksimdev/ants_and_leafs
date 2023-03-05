export default class StackFSM {
  constructor() {
    this.stack = new Array();
  }

  update() {
    const currentStateFunction = this.getCurrentState();

    if (currentStateFunction != null) {
        currentStateFunction();
    }
  }

  popState() {
      return this.stack.pop();
  }

  pushState(state) {
      if (this.getCurrentState() != state) {
        this.stack.push(state);
      }
  }

  getCurrentState() {
      return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }
}
import { v4 as uuidv4 } from 'uuid';

import StackFSM from './StackFSM.mjs';
import Vector from './Vector.mjs';

export default class Leaf {
  constructor(posX, posY) {
    this.id = uuidv4();
    this.position = new Vector(posX, posY);
    this.velocity = new Vector(0, 0);
    this.brain = new StackFSM();
    this.targetDestination = null;
  }
  moveBasedOnVelocity() {
    if (!this.velocity.length()) return;

    const n = Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
    const directionX = this.velocity.x / n || 0;
    const directionY = this.velocity.y / n || 0;
    const newPosition = this.position.add(new Vector(directionX, directionY));

    this.position = newPosition;
  };
  takeLeaf(targetDestination) {
    window.GAME.reservedLeafs.push(this);
    this.targetDestination = targetDestination;
    this.brain.pushState(this.move.bind(this));
  }
  putLeaf() {
    this.targetDestination = null;
    this.brain.popState();
  }

  destroy(type) {
    window.GAME[type] = window.GAME[type].filter(item => item.id !== this.id);
  }

  move() {
    this.velocity = this.position.subtract(this.targetDestination.position).negate();
  }

  update() {
    if (this.brain.getCurrentState()) {
      this.brain.update();
      this.moveBasedOnVelocity();
    }
  }
}
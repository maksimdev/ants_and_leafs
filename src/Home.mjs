import { v4 as uuidv4 } from 'uuid';

import StackFSM from './StackFSM.mjs';
import Vector from './Vector.mjs';

export default class Home {
  constructor(posX, posY) {
    this.id = uuidv4();
    this.position = new Vector(posX, posY);
    this.velocity = new Vector(0, 0);
    this.brain = new StackFSM();
  }
}
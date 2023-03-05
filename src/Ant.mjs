import { v4 as uuidv4 } from 'uuid';

import StackFSM from './StackFSM.mjs';
import Vector from './Vector.mjs';

export default class Ant {
  constructor(posX, posY, home) {
    this.id = uuidv4();
    this.position = new Vector(posX, posY);
    this.velocity = new Vector(0, 0);
    this.brain = new StackFSM();
    this.home = home;
    this.target = null;
  }

  moveBasedOnVelocity() {
    if (!this.velocity.length()) return;

    const n = Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
    const directionX = this.velocity.x / n || 0;
    const directionY = this.velocity.y / n || 0;
    const newPosition = this.position.add(new Vector(directionX, directionY));

    this.position = newPosition;
  };

  findLeaf() {
    if (!window.GAME.leafs.length) {
      this.brain.popState();
      this.brain.pushState(this.goHome.bind(this));

      return;
    }

    const setTarget = (leafs) => {
      const getRandomLeaf = (leafs) => {
        const randomIndex = Math.floor(Math.random() * leafs.length);
        return leafs[randomIndex];
      }

      if (!this.target || (this.target && !leafs.find(leaf => leaf.id === this.target.id))) {
        this.target = getRandomLeaf(leafs);
      }
    };

    setTarget(window.GAME.leafs);

    // Перемещает муравья к листу.
    this.velocity = this.target.position.subtract(this.position);

    if (this.target.position.subtract(this.position).length() < 1) {
      this.target.takeLeaf(this.home);
      this.target.destroy('leafs');
      this.brain.pushState(this.goHome.bind(this));
    }
    // if (distance(GAME.leaf, this) <= 10) {
        // Муравей только что подобрал листок, время
        // возвращаться домой!
    //     //brain.setState(goHome);

    //     this.brain.setState(this.stop)
    // }

    // if (distance(Game.mouse, this) <= MOUSE_THREAT_RADIUS) {
    //     // Курсор мыши находится рядом. Бежим!
    //     // Меняем состояние автомата на runAway()
    //     brain.setState(runAway);
    // }
  }

  goHome() {
    this.velocity = this.position.subtract(this.home.position).negate();

    if (this.position.subtract(this.home.position).length() < 1) {
      this.target.destroy('reservedLeafs');
      this.brain.popState();
    }
  }

  //runAway() {}

  stop() {}

  update() {
    if (!this.brain.getCurrentState()) this.brain.pushState(this.findLeaf.bind(this));
    this.brain.update();

    this.moveBasedOnVelocity();
  }
}
import Ant from './Ant.mjs';
import Home from './Home.mjs';
import Leaf from './Leaf.mjs';
import DrawService from './DrawService.mjs';
import UserController from './UserController.mjs';

const drawService = new DrawService();
const userController = new UserController();
userController.init();

const home1 = new Home(10, 10);
const home2 = new Home(500, 500);

const ant11 = new Ant(home1.position.x, home1.position.y, home1);
const ant12 = new Ant(home1.position.x, home1.position.y, home1);
const ant13 = new Ant(home1.position.x, home1.position.y, home1);

const ant21 = new Ant(home2.position.x, home2.position.y, home2);
const ant22 = new Ant(home2.position.x, home2.position.y, home2);

window.GAME = {
  homes: [
    home1,
    home2
  ],
  ants: [
    ant11,
    ant12,
    ant13,
    ant21,
    ant22
  ],
  leafs: [
    new Leaf(150, 150),
    new Leaf(200, 200),
    new Leaf(300, 100),
    new Leaf(400, 50),
    new Leaf(120, 10),
    new Leaf(700, 120),
    new Leaf(80, 680),
    new Leaf(900, 100)
  ]
};

const gameFrame = () => {
  drawService.drawFrame();
  window.GAME.ants.forEach(ant => ant.update());

  if (!window.GAME.leafs.length) clearTimeout(animation)
};

const animation = setInterval(gameFrame, 60);
// setTimeout(() => clearTimeout(animation), 100000);



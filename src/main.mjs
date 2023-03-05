import Ant from './Ant.mjs';
import Home from './Home.mjs';
import Leaf from './Leaf.mjs';
import DrawService from './DrawService.mjs';
import UserController from './UserController.mjs';

const config = {
  height: 1000, //1000
  width: 1900, //1900
  homeAmount: 10,
  antsPerHome: 10,
  leafAmount: 200
};

const generateGameConfig = ({ homeAmount, antsPerHome, leafAmount }) => {
  const ants = [];
  const homes = (new Array(homeAmount)).fill(null).map(
    () => new Home(Math.floor(Math.random() * config.width) + 1, Math.floor(Math.random() * config.height) + 1)
  );

  homes.forEach(home => {
    (new Array(antsPerHome))
      .fill(null)
      .map(() => new Ant(home.position.x, home.position.y, home))
      .forEach(ant => ants.push(ant));
  });

  const leafs = (new Array(leafAmount)).fill(null).map(
    () => new Leaf(Math.floor(Math.random() * config.width) + 1, Math.floor(Math.random() * config.height) + 1)
  );

  return {
    homes,
    ants,
    leafs
  }
};

const drawService = new DrawService(config.width, config.height);
const userController = new UserController();
userController.init();

const gameConfig = generateGameConfig(config);

window.GAME = {
  homes: gameConfig.homes,
  ants: gameConfig.ants,
  leafs: gameConfig.leafs,
  reservedLeafs: []
};

const gameFrame = () => {
  drawService.drawFrame();
  window.GAME.ants.forEach(ant => ant.update());
  window.GAME.reservedLeafs.forEach(reservedLeaf => reservedLeaf.update());

  // if (!window.GAME.leafs.length) clearTimeout(animation)
};

const animation = setInterval(gameFrame, 60);
// setTimeout(() => clearTimeout(animation), 100000);



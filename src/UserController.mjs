import Leaf from './Leaf.mjs';

export default class UserController {
  init() {
    const canvas = document.getElementById('canvas');

    canvas.addEventListener("click", function(event) {      
      window.GAME.leafs.push(new Leaf(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop));
		});
  }
}
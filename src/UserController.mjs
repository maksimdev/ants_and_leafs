import Leaf from './Leaf.mjs';

export default class UserController {
  init() {
    const canvas = document.getElementById('canvas');

    canvas.addEventListener("click", function(event) {
			var x = event.clientX - canvas.offsetLeft;
			var y = event.clientY - canvas.offsetTop;
      
      window.GAME.leafs.push(new Leaf(x, y));
		});
  }
}
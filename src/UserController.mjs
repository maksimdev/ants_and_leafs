import Leaf from './Leaf.mjs';

export default class UserController {
  init() {
    const canvas = document.getElementById('canvas');

    canvas.addEventListener("click", function(event) {
			// Get the x and y coordinates of the mouse click relative to the canvas
			var x = event.clientX - canvas.offsetLeft;
			var y = event.clientY - canvas.offsetTop;
      
      window.GAME.leafs.push(new Leaf(x, y));
		});
  }
}
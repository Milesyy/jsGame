const canvas = document.getElementById('canvas1');
const c2 = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');
const ctx2 = c2.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = `shadow_dog.png`;
const spriteWidth = 575;
const spriteHeight = 523;

var frameX = 0;
var frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;

function animate(){
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
	if (gameFrame % staggerFrames == 0){
		if (frameX < 4) frameX++;
		else frameX = 0;
	}
	gameFrame++;
	requestAnimationFrame(animate);
}
animate();
c2.style.left = "500px";
c2.style.top = "200px";
const C2_W = c2.width = 200;
const C2_H = c2.height = 100;
ctx2.fillStyle = 'black';
ctx2.fillRect(50,40, 100, 20);
ctx2.fillStyle = 'white';
ctx2.fillText("Click me pls", 75, 55, 100);

console.log(ctx2);

c2.addEventListener("click", function(e){
	let x = e.pageX - intFromStyle(c2, "left");
	let y = e.pageY - intFromStyle(c2, "top");
	if (50 < x < 150 && 40 < y < 60){
		c2.style.left = "500px";
		c2.style.top = "200px";
		ctx2.clearRect(50, 40, 100, 20);
		ctx2.fillStyle = 'black';
		ctx2.fillRect(50,40, 100, 20);
		ctx2.fillStyle = 'white';
		ctx2.fillText("Oop Got me", 75, 55, 100);
		frameY ++;
		if (frameY > 2){
			frameY = 0;
		}
		setTimeout(function(){
			ctx2.clearRect(50, 40, 100, 20);
			ctx2.fillStyle = 'black';
			ctx2.fillRect(50,40, 100, 20);
			ctx2.fillStyle = 'white';
			ctx2.fillText("Click me pls", 75, 55, 100);
		}, 750);
	}
});
c2.addEventListener("mousemove", function(e){
	let cur = {"x":e.pageX, "y":e.pageY};
	let tar = {"x":intFromStyle(c2, "left")+100, "y":intFromStyle(c2, "top")+50};
	const {magX, magY} = calculateVector(tar, cur);
	setButtonPosition(c2, tar, magX, magY, 0.05);
});

function setButtonPosition(c2, prev, magX, magY, factor=1){
	c2.style.left = prev.x-100+(magX)*factor+"px";
	c2.style.top = prev.y-50+(magY)*factor+"px";
}

function intFromStyle(obj, property){
	return parseInt(obj.style[property].slice(0,-2));
}

function calculateVector(tar, cur){
	let magX = tar.x - cur.x;
	let magY = tar.y - cur.y;
	Math.abs(magX) < 20 ? magX = 0: magX;
	Math.abs(magY) < 20 ? magY = 0: magY*2;
	return {magX, magY}; 
}

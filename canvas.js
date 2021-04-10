// console.log("Hello World");
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
// Rectangle Drawing

// c.fillStyle = "rgba(255,0,0,0.4)";
// c.fillRect(100, 100, 200, 200);
// c.fillStyle = "rgba(0,255,0,0.4)";
// c.fillRect(120, 120, 200, 200);
// c.fillStyle = "rgba(0,0,255,0.4)";
// c.fillRect(140, 140, 200, 200);
// console.log(canvas);

//Line Drawing

// c.beginPath();
// c.moveTo(100, 400);
// c.lineTo(500, 450);
// c.lineTo(500, 750);
// c.lineTo(100, 750);
// c.lineTo(100, 400);
// c.strokeStyle = "rgba(42, 87, 161,1)";
// c.stroke();

//Arc / Circle

// c.beginPath();
// c.strokeStyle = "red";
// c.arc(700, 100, 50, 0, Math.PI * 2, false);
// c.stroke();

//forloop canvas

// for (let i = 0; i < 100; i++) {
// 	c.beginPath();
// 	const randomColor = Math.floor(Math.random() * 16777215).toString(16);
// 	c.strokeStyle = "#" + randomColor;
// 	c.arc(900 + i * 3.2, 100 + i * 5, 50, 0, Math.PI * 2, false);
// 	c.stroke();
// }

//Multiple Circle

var mouse = {
	x: undefined,
	y: undefined,
};

window.addEventListener("mousemove", function (e) {
	mouse.x = e.x;
	mouse.y = e.y;
});
window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

colorArray = [
	// "#2679ff",
	"#ff5512",
	"#242424",
	"#6b6b6b",
	"#a1a1a1",
];

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.maxRadius = 60;
	this.minRadius = this.radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	this.draw = function () {
		c.beginPath();
		c.fillStyle = this.color;
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fill();
	};
	this.update = function () {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		//interacting

		if (mouse.x - this.x < 50 && mouse.y - this.y < 50 && mouse.x - this.x > -50 && mouse.y - this.y > -50) {
			if (this.radius < this.maxRadius) this.radius += 1;
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		this.draw();
	};
}

var largeCircleArray = [];
function init() {
	largeCircleArray = [];
	for (let i = 0; i < 1000; i++) {
		var radius = Math.random() * 10 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 1.7;
		var dy = (Math.random() - 0.5) * 1.7;
		largeCircleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animation() {
	requestAnimationFrame(animation);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < largeCircleArray.length; i++) {
		largeCircleArray[i].update();
	}
}
animation();
init();
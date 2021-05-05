window.onload = init;

var map;
var ctxMap;
var drawBtn;
var clearBtn;

var player;
var ctxPlayer;

var gameWidth = 1000;
var gameHight = 500;

var background = new Image();
background.src = "back.png";

var tiles = new Image();
tiles.src = "SpriteSheet.png";

var pl;
var enemy;

var isPlaying;

var requestAnimationFrame = window.requestAnimationFrame ||
                              window.webkitRequestAnimationFrame  ||
                              window.mozRequestAnimationFrame  ||
                              window.msRequestAnimationFrame;

function init()
{
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	player = document.getElementById("player");
	ctxPlayer = player.getContext("2d");

	map.width = gameWidth;
	map.height = gameHight;
	player.width = gameWidth;
	player.height = gameHight;

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click", drawRect, false);
	clearBtn.addEventListener("click", clearRect, false);


	pl = new Player();
	enemy = new Enemy();

	drawBg();

	startloop();

	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
}

function loop()
{
	if (isPlaying)
	{
		draw();
		update();
		requestAnimationFrame(loop);
	}

}

function startloop ()
{
	isPlaying = true;
	loop ();
}

function stoploop ()
{
	isPlaying = false;

}

function draw()
{
	pl.draw();
	enemy.draw();
}

function update()
{
	pl.update();

}

function Player()
{
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.width = 45;
	this.height = 90;
	this.speed = 3;

	this.isUp = false;
	this.isDown = false;
	this.isRight = false;
	this.isLeft = false;
}

function Enemy()
{
	this.srcX = 0;
	this.srcY = 89;
	this.drawX = 700;
	this.drawY = 50;
	this.width = 60;
	this.height = 35;

	this.speed = 8;
}

Enemy.prototype.draw = function ()
{
	ctxMap.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
}

Player.prototype.draw = function ()
{
	clearCtxPlayer();
	ctxPlayer.drawImage(tiles, this.srcX, this.srcY, 60, 80,
		this.drawX, this.drawY, this.width, this.height);
}

Player.prototype.update = function ()
{
	this.chooseDir();
}

Player.prototype.chooseDir = function ()
{
	if(this.isUp)
		this.drawY -= this.speed;
	if(this.isDown)
		this.drawY += this.speed;
	if(this.isLeft)
		this.drawX -= this.speed;
	if(this.isRight)
		this.drawX += this.speed;
}

function checkKeyDown (e)
{
	var keyID = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyID);

	if (keyChar == "W")
	{
		pl.isUp = true;
		e.preventDefault();
	}
	if (keyChar == "S")
	{
		pl.isDown = true;
		e.preventDefault();
	}
	if (keyChar == "D")
	{
		pl.isRight = true;
		e.preventDefault();
	}
	if (keyChar == "A")
	{
		pl.isLeft = true;
		e.preventDefault();
	}

}

function checkKeyUp (e)
{
	var keyID = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyID);

	if (keyChar == "W")
	{
		pl.isUp = false;
		e.preventDefault();
	}
	if (keyChar == "S")
	{
		pl.isDown = false;
		e.preventDefault();
	}
	if (keyChar == "D")
	{
		pl.isRight = false;
		e.preventDefault();
	}
	if (keyChar == "A")
	{
		pl.isLeft = false;
		e.preventDefault();
	}

}

function drawRect ()
{
  ctxMap.fillStyle = "#fff";
  ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect ()
{
	ctxMap.clearRect(0, 0, 800, 500);
}

function clearCtxPlayer()
{
	ctxPlayer.clearRect(0, 0, gameWidth, gameHight)
}

function drawBg ()
{
	ctxMap.drawImage(background, 0, 0, 768, 192,
		0, 0, map.width, map.height);
}

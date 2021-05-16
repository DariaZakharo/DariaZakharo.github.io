window.onload = init;

var map;
var ctxMap;
var drawBtn;
var clearBtn;

var player;
var ctxPlayer;

var enemyCv;
var ctxEnemy;

var enemy2Cv;
var ctxEnemy2;

var fishCv;
var ctxFish;

var fireCv;
var ctxFire;

var stats;
var ctxStats;

var stats_score;
var ctxScore;

var control = localStorage.getItem('controlType');

var gameWidth = 1000;
var gameHight = 500;

var background = new Image();
background.src = "back.png";

var background1 = new Image();
background1.src = "back.png";

var tiles = new Image();
tiles.src = "SpriteSheet.png";

var pl;
var en;
var enemies = [];
var fishes = [];
var fire = [];
var enemy2;

var count_fire = -1;

var isPlaying;
var health=3;
var score = 0;
var damage = 0;

var mapX = 0;
var map1X = gameWidth;

//var spawnInterval;
//var spawnTime = 20000;
//var spawnAmount = 10;

var requestAnimationFrame = window.requestAnimationFrame ||
                              window.webkitRequestAnimationFrame  ||
                              window.mozRequestAnimationFrame  ||
                              window.msRequestAnimationFrame;

const GAMESTATE = {
  MENU: 2,
  GAMEOVER: 3
};                              

function init()
{
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	player = document.getElementById("player");
	ctxPlayer = player.getContext("2d");

	enemyCv = document.getElementById("enemy");
	ctxEnemy = enemyCv.getContext("2d");

	enemy2Cv = document.getElementById("enemy2");
	ctxEnemy2 = enemy2Cv.getContext("2d");

	fishCv = document.getElementById("fish");
	ctxFish = fishCv.getContext("2d");

	fireCv = document.getElementById("fire");
	ctxFire = fireCv.getContext("2d");

	stats = document.getElementById("stats");
	ctxStats = stats.getContext("2d");

	stats_score = document.getElementById("stats_score");
	ctxScore = stats_score.getContext("2d");

	map.width = gameWidth;
	map.height = gameHight;
	player.width = gameWidth;
	player.height = gameHight;
	enemyCv.width = gameWidth;
	enemyCv.height = gameHight;
	enemy2Cv.width = gameWidth;
	enemy2Cv.height = gameHight;
	stats.width = gameWidth;
	stats.height = gameHight;
	stats_score.width = gameWidth;
	stats_score.height = gameHight;
	fishCv.width = gameWidth;
	fishCv.height = gameHight;
	fireCv.width = gameWidth;
	fireCv.height = gameHight;

	ctxStats.fillStyle = "#FEC200";
	ctxStats.font = "bold 15pt Arial"

	ctxScore.fillStyle = "#FEC200";
	ctxScore.font = "bold 15pt Arial"

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click", drawRect, false);
	clearBtn.addEventListener("click", clearRect, false);


	pl = new Player();
	en = new Enemy2();

	

	spawnFishes(5);
	spawnEnemy(8);

	startloop();

	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
}

function spawnEnemy(count)
{
	for(var i = 0; i<count; i++)
	{
		enemies[i] = new Enemy();
	}

}

function spawnFishes(count)
{
	for(var i = 0; i<count; i++)
	{
		fishes[i] = new Fish();
	}

}

//function startCreatingEnemies()
//{
	//stopCreatingEnemies();
	//spawnInterval = setInterval(function(){spawnEnemy(spawnAmount)}, spawnTime);
//}

//function stopCreatingEnemies()
//{
	//clearInterval(spawnInterval);
//}

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
	//startCreatingEnemies();
}

function stoploop ()
{
	isPlaying = false;

}

function draw()
{
	pl.draw();

    clearCtxEnemy();
	for (var i = 0; i < enemies.length; i++)
	{
		enemies[i].draw(); 
	}
	clearCtxFish();
	for (var i = 0; i < fishes.length; i++)
	{
		fishes[i].draw(); 
	}
	clearCtxFire();
	for (var i = 0; i < fire.length; i++)
	{
		fire[i].draw(); 
	}

	if(score >= 150)
		en.draw();
}

function update()
{
	moveBg();
	drawBg();
	updateStats();
	pl.update();

	if(score >= 150)
		en.update();

	for (var i = 0; i < enemies.length; i++)
	{
		enemies[i].update(); 
	}
	for (var i = 0; i < fishes.length; i++)
	{
		fishes[i].update(); 
	}
	for (var i = 0; i < fire.length; i++)
	{
		fire[i].update(); 
	}

}

function moveBg()
{
	var vel = 2; 
	mapX -= 2;
	map1X -= 2;
	if (mapX+gameWidth<0) mapX = gameWidth-5;
	if (map1X+gameWidth<0) map1X = gameWidth-5;
}

function Player()
{
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = gameWidth / 3;
	this.drawY = gameHight / 2;
	this.width = 45;
	this.height = 90;
	this.speed = 3;

	this.isUp = false;
	this.isDown = false;
	this.isRight = false;
	this.isLeft = false;

	this.invisibility = false;
}

function Enemy()
{
	this.srcX = 0;
	this.srcY = 256;
	this.drawX = Math.floor(Math.random()*gameWidth) + gameWidth;
	this.drawY = Math.floor(Math.random()*gameHight);
	this.width = 21;
	this.height = 70;

	this.speed = 6;
}

function Enemy2()
{
	this.srcX = 0;
	this.srcY = 355;
	this.drawX = gameWidth+40;
	this.drawY = gameHight/2;
	this.width = 50;
	this.height = 100;

	this.speed = 5;
}


Enemy.prototype.draw = function ()
{
	ctxEnemy.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
}

Enemy2.prototype.draw = function ()
{
	clearCtxEnemy2();
	ctxEnemy2.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
}

Enemy.prototype.update = function ()
{
	this.drawX -= 2;
	if (this.drawX + this.width < 0) 
	{
		this.drawX = Math.floor(Math.random()*gameWidth) + gameWidth;
	    this.drawY = Math.floor(Math.random()*gameHight);
	}
}

Enemy2.prototype.update = function ()
{
	this.drawX -= 2;
	if (damage == 3){
		alert("Вы победили! Ваш счет: "+(score));
		document.location.replace('menu.html');
	}
	if (this.drawX + this.width < 0) 
	{
		isPlaying = false;
	}
}

Enemy.prototype.destroy = function()
{
	enemies.splice(enemies.indexOf(this),1);
}

function Fish()
{
	this.srcX = 0;
	this.srcY = 89;
	this.drawX = Math.floor(Math.random()*gameWidth) + gameWidth;
	this.drawY = Math.floor(Math.random()*gameHight);
	this.width = 60;
	this.height = 40;

	this.speed = 5;
}

function Fire()
{
	this.srcX = 0;
	this.srcY = 443;
	this.drawX = pl.drawX+45;
	this.drawY = pl.drawY+45;
	this.width = 12;
	this.height = 12;

	this.speed = 4;

	this.isfire = false;
}

Fire.prototype.draw = function ()
{
	ctxFire.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
}

Fire.prototype.update = function ()
{
	this.drawX += 8;

	for (var i=0; i < fire.length; i++){
		if (fire[i].drawX < gameWidth){
			for (var j=0; j < enemies.length; j++){
    		    if (fire[i].drawX >= enemies[j].drawX &&
    		    fire[i].drawY >= enemies[j].drawY &&
    		    fire[i].drawX <= enemies[j].drawX + enemies[i].width &&
    		    fire[i].drawY <= enemies[j].drawY + enemies[i].height)
    		    {
    			    enemies.splice(j, 1);
    			    score += 10;
    			    enemies[enemies.length] = new Enemy();
    			    //fire.splice(i, 1);
    			    continue;
    	        }
    	    }
    	    if (score >= 150 && en.drawX <= gameWidth){
			//for (var i=0; i < fire.length; i++){
				if (fire[i].drawX >= en.drawX &&
    		        fire[i].drawY >= en.drawY &&
    		        fire[i].drawX <= en.drawX + en.width &&
    		        fire[i].drawY <= en.drawY + en.height)
    		    {
    			damage += 1;
    			//fire.splice(i, 1);
		        //continue;
    	        }
			//}	
		}
		}
		if(fire[i].drawX >= gameWidth)
			fire.splice(i, 1);
		
    }
}

Fish.prototype.draw = function ()
{
	ctxFish.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
}

Fish.prototype.update = function ()
{
	this.drawX -= 1;
	if (this.drawX + this.width < 0) 
	{
		this.drawX = Math.floor(Math.random()*gameWidth) + gameWidth;
	    this.drawY = Math.floor(Math.random()*gameHight);
	}

}

Fish.prototype.destroy = function()
{
	fishes.splice(fishes.indexOf(this),1);
}

Player.prototype.draw = function ()
{
	clearCtxPlayer();
	ctxPlayer.drawImage(tiles, this.srcX, this.srcY, 60, 80,
		this.drawX, this.drawY, this.width, this.height);
}

Player.prototype.update = function ()
{
	if (health == 0){
		alert("Вы проиграли! Ваш счет: "+(score));
		isPlaying = false;
		document.location.replace('menu.html');
	}

	if (this.drawX < 0) this.drawX = 0;
	if (this.drawX > gameWidth - this.width) this.drawX = gameWidth - this.width;
	if (this.drawY > gameHight - this.height) this.drawY = gameHight - this.height;
	if (this.drawY < 0) this.drawY = 0;

    if (pl.invisibility == false)
    	CheckPlace();

    this.chooseDir();
}


function changeInvisibility()
{
	pl.invisibility = false;
}

function CheckPlace()
{
	for (var i=0; i < fishes.length; i++)
    {
    	if (pl.drawX >= fishes[i].drawX &&
    		pl.drawY >= fishes[i].drawY &&
    		pl.drawX <= fishes[i].drawX + fishes[i].width &&
    		pl.drawY <= fishes[i].drawY + fishes[i].height)
    	{
    		health -= 1;
    		pl.invisibility = true;
    		setTimeout(changeInvisibility, 30000);
    	}
    }
}

Player.prototype.chooseDir = function ()
{
	if (control == 'wasd')
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
	else if (control == 'mouse')
	{

	}
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
	if (keyChar == "Q")
	{
		fire[fire.length] = new Fire();
		fire[fire.length-1].isfire = true;
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
	if (keyChar == "Q")
	{
		pl.isfire = false;
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
	ctxPlayer.clearRect(0, 0, gameWidth, gameHight);
}

function clearCtxEnemy2()
{
	ctxEnemy2.clearRect(0, 0, gameWidth, gameHight);
}

function clearCtxEnemy()
{
	ctxEnemy.clearRect(0, 0, gameWidth, gameHight);
}


function clearCtxFish()
{
	ctxFish.clearRect(0, 0, gameWidth, gameHight);
}

function clearCtxFire()
{
	ctxFire.clearRect(0, 0, gameWidth, gameHight);
}

function updateStats()
{
	ctxStats.clearRect(0, 0, gameWidth, gameHight);
	ctxStats.fillText("ЖИЗНИ: " + health, 10, 30);
	ctxScore.clearRect(0, 0, gameWidth, gameHight);
	ctxScore.fillText("ОЧКИ: " + score, 10, 60);
}

function drawBg ()
{
	ctxMap.clearRect(0, 0, gameWidth, gameHight);
	ctxMap.drawImage(background, 0, 0, 768, 192,
		mapX, 0, map.width, map.height);
	ctxMap.drawImage(background1, 0, 0, 768, 192,
		map1X, 0, map.width, map.height);
}


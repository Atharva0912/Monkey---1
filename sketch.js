var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var background,ground
var gameOver,gameOverImage

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey_collided = loadAnimation("sprite_1.png");
  
  gameOverImage = loadImage("gameover.png");
 
}



function setup() {
  createCanvas(600,600);
background = createSprite(300,300,600,600); 
background.shapeColor = "skyblue";
  
monkey = createSprite(100,420,20,20);
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.1;
monkey.addAnimation("collided",monkey_collided);
  
ground = createSprite(250,454,600,10)
ground.shapeColor = "green";
ground.velocityX = -8;
  
gameOver = createSprite(300,300);
gameOver.addImage("gameOver",gameOverImage)
gameOver.scale = 0.1;
gameOver.visible = false;
  
score = 0;
var survivalTime = 0;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
}


function draw() {
  
  ground.x = ground.width/2;
  
  if(gameState === PLAY){
      
  if(mouseDown("leftButton") && monkey.y>=400){
    
    monkey.velocityY = -10;
    
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
   obstacle();
   banana(); 
    
  if(bananaGroup.isTouching(monkey)){
    
    bananaGroup.destroyEach();
    score = score+2;
  }
    
  
if(obstacleGroup.isTouching(monkey)){
    
    gameState = END;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    monkey.velocityY = 0;
    monkey.changeAnimation("collided",monkey_collided);
    gameOver.visible = true;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    survivaTime = 0;
}  
  }
   
  
  drawSprites();
 
 fill("black");
 text("score: "+score,500,50);
  
survivalTime = Math.ceil(frameCount/frameRate());
textSize(20);
text("Survival Time: " + survivalTime,300,50);
  

}
  
function obstacle(){
 if(World.frameCount%60 === 0){ 
 var obstacle = createSprite(550,435,20,20);
   obstacle.addImage("obstacle",obstacleImage);
   obstacle.scale = 0.08;
   obstacle.velocityX = -8; 
   obstacle.setLifetime = 500;
   obstacleGroup.add(obstacle);
  }
}

function banana(){
if(World.frameCount%60 === 0){
  
var banana = createSprite(400,400,20,20);
   banana.addImage("banana",bananaImage);
   banana.scale = 0.1;
   banana.y = Math.round(random(360,450));
   banana.velocityX = -5;
   banana.lifetime = 500;
   bananaGroup.add(banana);
} 
  
}

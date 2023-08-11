var pc_running,pc,pc_stop
var npc_running,npc,npc_dead
var ground, invisibleGround, groundImage;
var bulletGroup, bulletImage;
var gameOver, restart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  pc_running = loadAnimation("idle_front.png","idle_left.png","idle_right.png","idle_back.png")
  pc_stop = loadImage ("idle_right.png")
  groundImage = loadImage("tank.jpg");
  npc_running = loadAnimation("idle_npc_left.png","walk1_npc_left.png")
  bulletImage = loadImage("bullet.png");
  npc_dead = loadImage ("idle_npc_left.png")
 /* trex_collided = loadAnimation("trex_collided.png");
  
  
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")*/
}
function setup() 
{
  createCanvas(1200,800);
 
  ground = createSprite(200,180,width,20);
  ground.addImage(groundImage)
  ground.velocityX = -2
  pc = createSprite(50,550,20,50);
  pc.addAnimation("running", pc_running);
  pc.addAnimation("stop",pc_stop)
  pc.scale=2 
  npc = createSprite(width-50,550,20,50)
  npc.addAnimation("running", npc_running);
  npc.addAnimation("dead",npc_dead)
  npc.scale=2 
  invisibleGround = createSprite(200,555,400,10);
  invisibleGround.visible = false;
  bulletsGroup = new Group();
}

function draw() 
{
background("tank.jpg");
if(gameState === PLAY ){


if (ground.x < width/2){
  ground.x = ground.width/2;
}
if((keyDown("space")) ) {
  pc.velocityY = -12;
  touches=[]
}
if((keyDown(UP_ARROW)) ) {
 spawnbullets()
}
pc.collide(invisibleGround);
pc.velocityY = pc.velocityY + 0.8
if (frameCount % 35 === 0) {
npc.y=random(100,600)
}
if(bulletsGroup.isTouching(npc)){
  gameState = END;

}
}
else  if (gameState===END){
npc.changeAnimation("dead",npc_dead)
pc.changeAnimation("stop",pc_stop)
ground.velocityX = 0;
pc.velocityY = 0;
pc.x=50
pc.y=550
bulletsGroup.setVelocityXEach(0);
bulletsGroup.setLifetimeEach(-1);
}
drawSprites()
}

function spawnbullets() {
  if (frameCount % 35 === 0) {
  var bullet = createSprite(pc.x,pc.y);
    bullet.addImage(bulletImage);
    bullet.scale = 0.3;
    bullet.velocityX = 3;
    
    
    bullet.lifetime = 600;

    bulletsGroup.add(bullet);
  }
  }
  

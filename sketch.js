var monster1,monster2,monster3,monster4,monster5;
var monster1Img,monster2Img,monster3Img,monsterImg,monster5Img;
var cloud,cloudImg;
var tree,treeImg;
var Sam, samImg, samA;
var ground,groundImg;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
monster1Img = loadImage("Monster_1.png");
monster2Img = loadImage("Monster_2.png");
monster3Img = loadImage("Monster_3.png");
monster4Img = loadImage("Monster_4.png");
monster5Img = loadImage("Monster_5.png");
cloudImg = loadImage("Cloud.png");
samA = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png");
samImg = loadAnimation("Sam standing.png");
groundImg = loadImage("ground.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  Sam = createSprite(70, 150, 20, 20);
  Sam.addAnimation("standing",samImg);
  Sam.addAnimation("running",samA);
  ground = createSprite(width/2, height+200, width, height)
  ground.addImage(groundImg);
  ground.scale = 3.5;
  ground.depth = Sam.depth;
  Sam.depth+= 1;
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background("lightblue"); 
  if(keyDown(RIGHT_ARROW)){
    gameState=PLAY;
  }
  if(gameState===PLAY){
   ground.velocityX = -4;
   console.log(ground.x)
    Sam.changeAnimation("running");
    Sam.y=300;

    if (ground.x < 0){
      ground.x = width/2+500
    }
    spawnClouds();
    spawnObstacles();
  } 

  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var cloud = createSprite(width,120,40,10);
    cloud.y = Math.round(random(80,300));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = width/3;
    
    //adjust the depth
    cloud.depth = Sam.depth;
    Sam.depth = Sam.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width,190,10,40);
    //obstacle.debug = true;
    obstacle.velocityX =-6
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(monster1Img);
              break;
      case 2: obstacle.addImage(monster2Img );
              break;
      case 3: obstacle.addImage(monster3Img);
              break;
      case 4: obstacle.addImage(monster4Img);
              break;
      case 5: obstacle.addImage(monster5Img);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
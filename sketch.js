var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlocksGroup;

var gameState = "play";

var spookySound;

function preload() {
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  doorsGroup = new Group();
  
  climberImg = loadImage("climber.png");
  climbersGroup = new Group();
  
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  invisibleBlocksGroup = new Group();
  
  spookySound.loop();
}

function draw() {
  background(0);
  
  if(gameState === "play") {
    if(tower.y > 400) {
      tower.y = 300;
    }

    if(keyDown("left_arrow")) {
      ghost.x = ghost.x -3;
    }

    if(keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    if(keyDown("space")) {
      ghost.velocityY = -5;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if(invisibleBlocksGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }

    spawnDoors();

    drawSprites();
  }
  
  if(gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
}

function spawnDoors() {
  if(frameCount % 240 === 0) {
    door = createSprite(200,-50);
    door.addImage("door",doorImg);
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    
    door.lifeTime = 800;
    
    doorsGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    
    climber.lifeTime = 800;
    
    climbersGroup.add(climber);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    
    invisibleBlock.lifeTime = 800;
    
    invisibleBlocksGroup.add(invisibleBlock);
  }
}
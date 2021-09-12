var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 550);
  ghost.addImage(ghostImg);
  ghost.scale = 0.25;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  drawSprites();
  textSize(20);

  if (gameState == "play") {
    if (tower.y > 400) {
      tower.y = 300
    }

    ghost.velocityY += 0.5;
    if (keyDown("space")) {
      ghost.velocityY = -12;
    }
    if (keyIsDown(LEFT_ARROW)) {
      ghost.x -= 10;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      ghost.x += 10;
    }

    spawnDoors();

    if (ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
    }
    if (ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
  }
  if (gameState == "end"){
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    climbersGroup.destroyEach();

    tower.destroy();

    fill(255, 0, 0);
    text("GAME OVER!", 250, 250);
  }
}

function spawnDoors() {
  if (frameCount % 240 == 0) {
    door = createSprite(random(120, 400), -50);
    climber = createSprite(door.x, 10);
    invisibleBlock = createSprite(climber.x, climber.y, climber.width, 2);

    door.addImage(doorImg);
    climber.addImage(climberImg);
    invisibleBlock.visible = false;

    climber.scale = 0.75;

    door.velocityY = 4;
    climber.velocityY = 4;
    invisibleBlock.velocityY = 4;

    door.lifetime = 300;
    climber.lifetime = 300;
    invisibleBlock.lifetime = 300;

    ghost.depth = door.depth;
    ghost.depth++;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
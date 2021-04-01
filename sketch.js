var PLAY=1
var END=0
var gameState=PLAY

function preload(){
  
  towerImg=loadImage('tower.png')
  ghostImg=loadImage('ghost-standing.png')
  doorImg=loadImage('door.png')
  climberImg=loadImage('climber.png')
  spooky=loadSound('spooky.wav')
  
}
function setup(){
  
createCanvas(600,600)
tower=createSprite(300,300)
tower.addImage(towerImg)
tower.velocityY=1
ghost=createSprite(200,200,50,50)
ghost.addImage(ghostImg)
ghost.scale=0.45
doorGroup=new Group()
climberGroup=new Group()
invGroup=new Group()

}
function draw(){
  
  background(0)
  if (gameState===PLAY){
  if (keyDown('left')){
 ghost.x=ghost.x-3
    }
    if (keyDown('right')){
 ghost.x=ghost.x+3
    }
    if (keyDown('space')){
 ghost.velocityY=-10
    }
    ghost.velocityY=ghost.velocityY+0.8
    if(tower.y>400){
      tower.y=300
      
    }
    createDoors()  
    if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0
    }
    if(invGroup.isTouching(ghost)||ghost.y>600){
    gameState=END
    ghost.destroy()
    }
    
  
  drawSprites()
}
if(gameState===END){
  textSize(30)
  fill('yellow')
  stroke("red")
  strokeWeight(4)
  text("GAME OVER",230,250)
  
}

}
function createDoors(){
  if(frameCount%240===0){
  var door=createSprite(200,-50)
  var climber=createSprite(200,10)
  var inv=createSprite(200,15)
  inv.width=climber.width
  inv.height=2
  inv.debug=true
  door.x=Math.round(random(120,400))
    climber.x=door.x
    inv.x=door.x
    door.addImage(doorImg)
    climber.addImage(climberImg)
    door.velocityY=1
    climber.velocityY=1
    inv.velocityY=1
    door.lifetime=800
    climber.lifetime=800
    inv.lifetime=800
    ghost.depth=door.depth
    ghost.depth+=1

doorGroup.add(door)
climberGroup.add(climber)
invGroup.add(inv)

  }
}

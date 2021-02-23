var pickle, pickleJar, groundback, coin, obstacle, invisGround, edges, gameOver
var pickleImg, pickleJarImg, backgroundImg, coinImg, obstacleImg, gameOverImg
var fireGroup, coinGroup
var PLAY = 1
var END = 0
var score = 0
var gameState = PLAY

function preload(){
pickleImg = loadImage("pickle.png")
pickleJarImg = loadImage("picklejar.png")
backgroundImg = loadImage("background.jpg")
coinImg = loadImage("coin.png")
obstacleImg = loadImage("obstacle.png")
gameOverImg = loadImage("gameover.png")


}

function setup(){
createCanvas(1500,600)
groundback = createSprite(200,0,1500,700)
groundback.addImage(backgroundImg)
groundback.scale=2.5
groundback.velocityX=-4
pickle = createSprite(50,450,50,50)
pickle.addImage(pickleImg)
pickle.scale=0.1
pickleJar = createSprite(1350,300,10,10)
pickleJar.addImage(pickleJarImg)
pickleJar.scale=0.25
invisGround = createSprite(0,457,3000,20)
invisGround.visible = false
groundback.x=groundback.width/2
console.log(displayWidth)
console.log(displayHeight)
fireGroup = new Group()
coinGroup = new Group()
}

function draw(){
background("green")
edges = createEdgeSprites()

pickle.collide(invisGround)
if (gameState===PLAY){
    if(groundback.x<600){
    groundback.x=1000
    }

if(keyDown("space")){
    pickle.velocityY = -10
}
pickle.velocityY = pickle.velocityY + 0.8
spawnObstacles()
spawnCoins()
if (keyDown("right")) {
    pickle.velocityX = 3
}
if (keyDown("left")){
    pickle.velocityX = -3
}
pickle.collide(edges)
if(coinGroup.isTouching(pickle)){
    score = score + 2
    coinGroup.destroyEach()
}
if(fireGroup.isTouching(pickle)){
    gameState = END
    fireGroup.destroyEach()
    coinGroup.destroyEach()
    pickle.addImage(gameOverImg)
}

}
if(gameState === END){
groundback.velocityX = 0
pickle.velocityX = 0
pickle.velocityY = 0
}
drawSprites()
if(score >= 6 && pickle.isTouching(pickleJar)){
    textSize(30)
    text("You win!",350,300)
}
textSize(20)
fill("green")
text ("score:"+score,750,50)
fill("white")
text ("Earn 30 points to touch me and win!", 1150, 200)
}

function spawnObstacles(){
    if (frameCount % 250 === 0){
        var obstacle = createSprite(1300,Math.round(random(200,400)),10,10)
        obstacle.addImage(obstacleImg)
        obstacle.velocityX = -2
        obstacle.scale = 0.2
        fireGroup.add(obstacle)
        obstacle.lifetime=700
    }
}

function spawnCoins(){
    if (frameCount % 175 === 0){
        var coin = createSprite(1300,Math.round(random(100,450)),10,10)
        coin.addImage(coinImg)
        coin.velocityX = -3
        coin.scale = 0.2
        coinGroup.add(coin)
        coin.lifetime=700
    }
}